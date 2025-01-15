import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedUser } from './decorator/authenticated-user.decorator';
import { BasicGuard } from './guards/basic.guard';
import { ConstantMessage } from '../constants/constant-messages';
import { LoginResponseType } from '../core-modules/user/types/login-user-response';
import { GenericErrorResponse } from '../shared/types/generic-error.type';
import { SuccessMessageResponse } from '../shared/types/success-message.type';
import { AuthDto } from './dto/auth.dto';
import { AuthResponse } from './types/auth-success-response.type';
import { LogoutValidationError } from './types/logout-validation-error.type';
import { User } from '../core-modules/all-entities';
import {
  AuthValidationError,
  AuthValidationMessage,
} from './types/registration-validation-error.type';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { ResetPasswordValidationError } from './types/reset-password-validation-error.type';
import { VerificationCodeQueryDto } from './dto/verification-code-query.dto';
import { ResetPasswordValidation } from './types/reset-password-validation.type';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthErrorResponse } from './types/auth-error-response.type';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description:
      'This API enables user registration based on either email and password credentials or through social signup. It requires the user`s device ID for successful registration.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.REGISTER,
    type: AuthResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ConstantMessage.REG_CONFLICT,
    type: GenericErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unavailable Entity',
    type: AuthValidationError,
  })
  @Post('signup')
  async signup(
    @Body() signUpAuthDto: SignupAuthDto,
  ): Promise<LoginResponseType> {
    return await this.authService.signup(signUpAuthDto);
  }

  @ApiOperation({
    description:
      'This API facilitates user sign-in via email, password.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.SIGN_IN,
    type: AuthResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unavailable Entity',
    type: AuthValidationMessage,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async signin(
    @Body() authDto: AuthDto,
    @AuthenticatedUser() user: User,
  ): Promise<LoginResponseType> {
    return await this.authService.userSignIn(user);
  }

  @ApiOperation({
    description:
      'If verification code is expired and account is not verified. This Api will help to resend verification code',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verification code sent if account exists',
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable entity',
    type: ResetPasswordValidationError,
  })
  @Get('resend-code')
  @HttpCode(HttpStatus.OK)
  async resendCode(
    @Query() emailDto: VerificationCodeQueryDto,
  ): Promise<SuccessMessageResponse> {
    return await this.authService.resendVerificationCode(emailDto);
  }

  @ApiOperation({
    description: `This API will send a reset verification code to user's email. That can be used to reset password `,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Reset password verification code sent to email',
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable entity',
    type: ResetPasswordValidationError,
  })
  @Post('forgot-password')
  @HttpCode(HttpStatus.CREATED)
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<SuccessMessageResponse> {
    return await this.authService.forgotPassword(
      forgotPasswordDto.email,
    );
  }

  @ApiOperation({
    description: `This API will reset password on the base of code and current password`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.RESET_PASSWORD,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid verification code.',
    type: GenericErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable entity',
    type: ResetPasswordValidation,
  })
  @Post('reset-password')
  @HttpCode(HttpStatus.CREATED)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<SuccessMessageResponse> {
    await this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.verificationCode,
      resetPasswordDto.password,
    );
    return {
      message: ConstantMessage.RESET_PASSWORD,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: `This API will refresh tokens while refresh tokens are valid`,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.REFRESH_TOKENS,
    type: LoginResponseType,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable entity',
    type: AuthErrorResponse,
  })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @AuthenticatedUser() user: User,
  ): Promise<LoginResponseType> {
    return await this.authService.refreshTokens(user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: `Logout API will invalidate the token`,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.LOGOUT,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable entity',
    type: LogoutValidationError,
  })
  @UseGuards(BasicGuard)
  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @AuthenticatedUser() user: User,
  ): Promise<SuccessMessageResponse> {
    await this.authService.invalidateLoggedInUser(user);
    return { message: ConstantMessage.LOGOUT };
  }
}
