import {
  Injectable,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../shared/hash/hash.service';
import { AppErrorMessages } from '../constants/app-error-messages';
import { UserService } from '../core-modules/user/user.service';
import { User } from '../core-modules/all-entities';
import { LoginResponseType } from '../core-modules/user/types/login-user-response';
import { ConstantMessage } from '../constants/constant-messages';
import { UserTransformer } from '../core-modules/user/transformers/user.transformer';
import { ENV } from '../config/env';
import { BASIC_JWT } from './jwt/jwt.strategy';
import { BASIC_REFRESH_JWT } from './jwt/refresh-token.strategy';
import { GlobalHelper } from '../config/app-global-helper';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { RefRoleKeys } from '../shared/types/enums';
import { StaticLogger } from '../exception-and-error-handling/logger/winston';
import {
  AuthTokens,
  IVerificationCodeAndExpireTime,
} from './interfaces/auth.interface';
import { MailService } from '../shared/mail/mail.service';
import { SuccessMessageResponse } from '../shared/types/success-message.type';
import { VerificationCodeQueryDto } from './dto/verification-code-query.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { RoleService } from '../core-modules/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  /** signup */
  async signup(
    signUpAuthDto: SignupAuthDto,
  ): Promise<LoginResponseType> {
    await this.userService.checkIfUserAlreadyExist(
      signUpAuthDto.email,
    );

    const hashedPassword = await this.hashService.hash(
      signUpAuthDto.password,
    );

    const accessTokenId = GlobalHelper.generateRandomString();
    const refreshTokenId = GlobalHelper.generateRandomString();

    /** Find the Patient Role so that we and make relation with user and role entities*/
    const foundRole = await this.roleService.findOneByKey(
      RefRoleKeys.PATIENT,
    );

    try {
      /** create new user by passing the DTO password hash, lastLoginTime, and accessTokenHash */
      const createdUser = await this.userRepository.save({
        ...signUpAuthDto,
        passwordHash: hashedPassword,
        lastLoginTime: new Date(),
        accessTokenHash: await this.hashService.hash(accessTokenId),
        refreshTokenHash: await this.hashService.hash(refreshTokenId),
        userRoles: [{ refRole: foundRole }],
      });

      const accessPayload = {
        email: createdUser.email,
        sub: createdUser.id,
        purpose: BASIC_JWT,
        accessTokenId: accessTokenId,
      };

      const refreshPayload = {
        email: createdUser.email,
        sub: createdUser.id,
        purpose: BASIC_REFRESH_JWT,
        tokenId: refreshTokenId,
      };

      /** Add roles into the user_role entity.  */
      // this.userRoleRepository
      //   .save({ user: createdUser, refRole: foundRole })
      //   .then() /** To handle the error due to non-blocking nature of this function*/
      //   .catch(e => StaticLogger.instance.log('error', e));

      return {
        message: ConstantMessage.REGISTER,
        accessToken: this.jwtService.sign(accessPayload),
        refreshToken: this.jwtService.sign(refreshPayload, {
          secret: ENV.JWT_REFRESH_SECRET,
          expiresIn: `${ENV.JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTE}m`,
        }),
        user: new UserTransformer(createdUser),
      };
    } catch (error) {
      throw new NotImplementedException();
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      relations: { userRoles: { refRole: true }, department: true },
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(
        AppErrorMessages.account_not_exists_em,
      );
    }

    const passwordMatches = await this.hashService.check(
      password,
      user.passwordHash,
    );

    /**
     * Email/Username exists and password is incorrect
     */
    if (!passwordMatches) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_credentials_em,
      );
    }

    /**
     * Email/Username exists and password is correct
     */
    return user;
  }

  /** User SignIn */
  async userSignIn(user: User): Promise<LoginResponseType> {
    const { accessToken, refreshToken } = await this.generateTokens(
      user,
    );

    /** set login time and update user */
    user.lastLoginTime = new Date();
    await this.userRepository.save(user);

    return {
      message: ConstantMessage.SIGN_IN,
      accessToken,
      refreshToken,
      user: new UserTransformer(user),
    };
  }

  async refreshTokens(user: User): Promise<LoginResponseType> {
    const { accessToken, refreshToken } = await this.generateTokens(
      user,
    );

    return {
      message: ConstantMessage.REFRESH_TOKENS,
      accessToken,
      refreshToken,
      user: new UserTransformer(user),
    };
  }

  async generateTokens(user: User): Promise<AuthTokens> {
    const accessTokenId = GlobalHelper.generateRandomString();
    const refreshTokenId = GlobalHelper.generateRandomString();

    const accessPayload = {
      email: user.email,
      sub: user.id,
      purpose: BASIC_JWT,
      tokenId: accessTokenId,
    };

    const refreshPayload = {
      email: user.email,
      sub: user.id,
      purpose: BASIC_REFRESH_JWT,
      tokenId: refreshTokenId,
    };

    const accessTokenHash = await this.hashService.hash(
      accessTokenId,
    );
    const refreshTokenHash = await this.hashService.hash(
      refreshTokenId,
    );

    user.accessTokenHash = accessTokenHash;
    user.refreshTokenHash = refreshTokenHash;

    await this.userService.updateAccessToken(user);
    return {
      accessToken: this.jwtService.sign(accessPayload),
      refreshToken: this.jwtService.sign(refreshPayload, {
        secret: ENV.JWT_REFRESH_SECRET,
        expiresIn: `${ENV.JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTE}m`,
      }),
    };
  }

  /** Set Verification Token and set into DB */
  async resendVerificationCode(
    verificationCodeQueryDto: VerificationCodeQueryDto,
  ): Promise<SuccessMessageResponse> {
    const foundUser = await this.userRepository.findOne({
      where: {
        contactDetails: Raw(
          alias =>
            `${alias} @> '[{"type": "email", "value": "${verificationCodeQueryDto.email}"}]'`,
        ),
      }, // username is treated as email address
    });

    if (!foundUser) {
      return {
        message: ConstantMessage.CODE_WILL_BE_SENT_IF_ACCOUNT_EXISTS,
      };
    }

    const { code, codeExpireTime } = this.codeWithExpirationTime();

    /** Replace old verification code and the code expiration time */
    foundUser.emailVerificationTokenHash =
      await this.hashService.hash(code.toString());
    foundUser.emailVerificationTokenExpiryTime = codeExpireTime;

    /** Update User having the latest code and expiration time. */
    await this.userRepository.save(foundUser);

    await this.mailService.sendForgotPasswordVerificationCodeToEmail(
      foundUser,
      code,
      ConstantMessage.FORGOT_PASSWORD_SUBJECT,
    );

    return {
      message: ConstantMessage.CODE_WILL_BE_SENT_IF_ACCOUNT_EXISTS,
    };
  }

  /** verify the code and set user as verified true. So that users can sign in to their accounts */
  async verifyCode(
    verifyCodeDto: VerifyCodeDto,
  ): Promise<SuccessMessageResponse> {
    const foundUser = await this.userRepository.findOne({
      where: {
        contactDetails: Raw(
          alias =>
            `${alias} @> '[{"type": "email", "value": "${verifyCodeDto.email}"}]'`,
        ),
      },
    });

    if (!foundUser) {
      throw new NotFoundException(
        AppErrorMessages.user_by_email_not_found_em,
      );
    }

    if (foundUser.isEmailVerified === true) {
      return { message: ConstantMessage.ALREADY_VERIFIED };
    }

    if (
      !(await this.hashService.check(
        verifyCodeDto.code.toString(),
        foundUser.emailVerificationTokenHash,
      ))
    ) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_verification_code_em,
      );
    }

    const currentTime = new Date();

    if (foundUser.emailVerificationTokenExpiryTime < currentTime) {
      throw new UnauthorizedException(
        AppErrorMessages.verification_code_expired_em,
      );
    }

    await this.userRepository.save({
      id: foundUser.id,
      emailVerificationTokenHash: null,
      emailVerificationTokenExpiryTime: null,
      isEmailVerified: true,
    });

    return {
      message: ConstantMessage.ACCOUNT_VERIFIED,
    };
  }

  /** sent verification code to user */
  async forgotPassword(
    email: string,
  ): Promise<SuccessMessageResponse> {
    const userFound = await this.userRepository.findOne({
      where: { email },
    });

    /** The email doesn't exist */
    if (!userFound) {
      return {
        message: ConstantMessage.VERIFICATION_CODE_SENT,
      };
    }

    const { code, codeExpireTime } = this.codeWithExpirationTime();

    await this.userRepository.save({
      id: userFound.id,
      emailVerificationTokenHash: await this.hashService.hash(
        code.toString(),
      ),
      emailVerificationTokenExpiryTime: codeExpireTime,
    });

    this.mailService
      .sendForgotPasswordVerificationCodeToEmail(
        userFound,
        code,
        ConstantMessage.FORGOT_PASSWORD_SUBJECT,
      )
      .then() /** To handle the error due to non-blocking nature of this function*/
      .catch(e => StaticLogger.instance.log('error', e));

    return {
      message: ConstantMessage.VERIFICATION_CODE_SENT,
    };
  }

  /** Validate the code that is sent to the user on email */
  async isResetPasswordCodeValid(
    email: string,
    code: number,
  ): Promise<User> {
    let userFound: User;
    try {
      userFound = await this.userRepository.findOne({
        where: {
          contactDetails: Raw(
            alias =>
              `${alias} @> '[{"type": "email", "value": "${email}"}]'`,
          ),
        },
      });
    } catch (e) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_verification_code_em,
      );
    }

    if (!userFound) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_verification_code_em,
      );
    }

    if (userFound && userFound.emailVerificationTokenHash === null) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_verification_code_em,
      );
    }

    const currentTime = new Date();

    if (userFound.emailVerificationTokenExpiryTime < currentTime) {
      throw new UnauthorizedException(
        AppErrorMessages.verification_code_expired_em,
      );
    }

    if (
      !(await this.hashService.check(
        code.toString(),
        userFound.emailVerificationTokenHash,
      ))
    ) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_verification_code_em,
      );
    }
    return userFound;
  }

  /** Reset password for user by validating verification code on the basis of the email */
  async resetPassword(
    email: string,
    code: number,
    newPassword: string,
  ): Promise<User> {
    const user = await this.isResetPasswordCodeValid(email, code);
    const password = await this.hashService.hash(newPassword);
    await this.userRepository.save({
      id: user.id,
      passwordHash: password,
      emailVerificationTokenHash: null,
      emailVerificationTokenExpiryTime: null,
      isEmailVerified: !user.isEmailVerified
        ? true
        : user.isEmailVerified,
    });
    return this.userRepository.findOneBy({ id: user.id });
  }

  /** Logout user by setting up login status 'False' and Refresh Token null */
  async invalidateLoggedInUser(user: User): Promise<void> {
    await this.userRepository.save({
      id: user.id,
      accessTokenHash: null,
    });
  }

  /** set expiration time */
  private codeWithExpirationTime(): IVerificationCodeAndExpireTime {
    const code = GlobalHelper.generateRandomNumber();
    const currentTime = new Date();

    const codeExpireTime = new Date(
      currentTime.getTime() + 2 * 60000,
    );
    return { code, codeExpireTime };
  }
}
