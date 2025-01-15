import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { DataSource } from 'typeorm';
import { ENV } from '../config/env';
import { UserInterceptor } from '../auth/interceptors/user.interceptor';

export interface LogEntity {
  id: string;
  updatedAt: Date;
}

@UseInterceptors(UserInterceptor)
@Injectable()
export class AuditLogsService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private cls: ClsService,
  ) {}

  async afterInsert(
    entityName: string,
    entityObject: LogEntity,
    entityProperties: object,
  ): Promise<void> {
    const setQueryValues = `updated_by = '${this.tokenId()}', created_by = '${this.tokenId()}' `;
    await this.setUserAndAuditFields(
      entityProperties,
      entityName,
      entityObject,
      setQueryValues,
    );
  }

  async afterUpdate(
    entityName: string,
    afterUpdateObject: LogEntity,
    entityProperties: object,
  ): Promise<void> {
    const setQueryValues = `updated_by = '${this.tokenId()}'`;
    await this.setUserAndAuditFields(
      entityProperties,
      entityName,
      afterUpdateObject,
      setQueryValues,
    );
  }

  async afterSoftRecover(
    entityName: string,
    afterRecoverObj: LogEntity,
    entityProperties: object,
  ): Promise<void> {
    const setQueryValues = `deleted_by = null, recovered_by = '${this.tokenId()}'`;
    await this.setUserAndAuditFields(
      entityProperties,
      entityName,
      afterRecoverObj,
      setQueryValues,
    );
  }

  async afterSoftRemove(
    entityName: string,
    afterRemoveObj: LogEntity,
    entityProperties: object,
  ): Promise<void> {
    const setQueryValues = `deleted_by = '${this.tokenId()}'`;
    await this.setUserAndAuditFields(
      entityProperties,
      entityName,
      afterRemoveObj,
      setQueryValues,
    );
  }

  private async setUserAndAuditFields(
    entityProperties: object,
    entityName: string,
    afterUpdateObject: LogEntity,
    setQueryValues: string,
  ): Promise<void> {
    if (
      entityProperties.hasOwnProperty('deletedBy') &&
      entityProperties.hasOwnProperty('updatedBy') &&
      entityProperties.hasOwnProperty('createdBy')
    ) {
      await this.checkForCommunityUserNotToUpdateContentEntity(
        entityName,
        setQueryValues,
        afterUpdateObject,
      );
    }
  }

  private async checkForCommunityUserNotToUpdateContentEntity(
    entityName: string,
    setQueryValues: string,
    afterUpdateObject: LogEntity,
  ): Promise<void> {
    await this.dataSource.query(
      `UPDATE ${entityName} SET ${setQueryValues} WHERE (id = '${afterUpdateObject.id}');`,
    );
  }

  private tokenId(): string {
    return this.cls.get('UserToken')
      ? this.cls.get('UserToken').id
      : ENV.SYSTEM_USER_ID;
  }
}
