import { Inject } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { EntityNames } from '../config/entity-names';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuditLogsService, LogEntity } from './audit-logs.service';
import { ConstantMessage } from '../constants/constant-messages';

@EventSubscriber()
export class AuditGlobalSubscriber
  implements EntitySubscriberInterface
{
  constructor(
    datasource: DataSource,
    @Inject(AuditLogsService)
    private readonly AuditLogsService: AuditLogsService,
  ) {
    datasource.subscribers.push(this);
  }

  /**
   * Called in case any error
   */
  onError(e: Error): void {
    // @Todo: Can we somehow configure // Just to allow console log please replace with something useful
    const logger = console ? console : null;
    if (logger) {
      logger.log('Audit Log Error: ' + e.toString());
    }
  }

  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<unknown>): void {
    if (event.metadata.tableName === EntityNames.AUDIT_LOG) return;
    void this.AuditLogsService.afterInsert(
      event.metadata.tableName,
      event.entity as LogEntity,
      event.metadata.propertiesMap,
    )
      .then()
      .catch();
  }

  /**
   * Called before entity update.
   */
  async beforeUpdate(event: UpdateEvent<unknown>): Promise<void> {
    if (event.metadata.tableName === EntityNames.AUDIT_LOG) return;
    if (event && event.entity && !event.entity.id) {
      throw new Error(ConstantMessage.UPDATE_LOG_ERROR);
    }
  }

  /**
   * Called after entity update.
   */
  async afterUpdate(event: UpdateEvent<unknown>): Promise<void> {
    if (event.metadata.tableName === EntityNames.AUDIT_LOG) return;
    this.AuditLogsService.afterUpdate(
      event.metadata.tableName,
      event.entity as LogEntity,
      event.metadata.propertiesMap,
    )
      .then()
      .catch(e => this.onError(e));
  }

  /**
   * Called before entity removal.
   */
  beforeRemove(event: RemoveEvent<unknown>): void {
    if (event.metadata.tableName === EntityNames.AUDIT_LOG) return;
  }

  /**
   * Called after entity removal.
   */
  afterRemove(event: RemoveEvent<unknown>): void {
    if (event.metadata.tableName === EntityNames.AUDIT_LOG) return;
    if (!event.entityId) {
      throw new Error(EntityNames.AUDIT_LOG);
    }
  }

  /**
   * Called before entity removal.
   */
  async beforeSoftRemove(
    event: SoftRemoveEvent<unknown>,
  ): Promise<void> {
    if (event.metadata.tableName === EntityNames.AUDIT_LOG) return;
    if (!event.entityId) {
      throw new Error(ConstantMessage.SOFT_DELETE_LOG_ERROR);
    }
  }

  /**
   * Called after entity removal.
   */
  afterSoftRemove(event: SoftRemoveEvent<unknown>): void {
    if (event.metadata.tableName === EntityNames.AUDIT_LOG) return;
    if (!event.entityId) {
      throw new Error(ConstantMessage.NO_RECORD_SOFT_REMOVE);
    }
    this.AuditLogsService.afterSoftRemove(
      event.metadata.tableName,
      event.entity as LogEntity,
      event.metadata.propertiesMap,
    )
      .then()
      .catch(e => this.onError(e));
  }

  /**
   * Called before entity recovery.
   */
  async beforeRecover(event: RecoverEvent<unknown>): Promise<void> {
    if (event.metadata.tableName === EntityNames.AUDIT_LOG) return;
    if (!event.entityId) {
      throw new Error(ConstantMessage.NO_RECORD_RECOVER);
    }
  }

  /**
   * Called after entity recovery.
   */
  afterRecover(event: RecoverEvent<unknown>): void {
    if (event.metadata.tableName === EntityNames.AUDIT_LOG) return;
    this.AuditLogsService.afterSoftRecover(
      event.metadata.tableName,
      event.entity as LogEntity,
      event.metadata.propertiesMap,
    )
      .then()
      .catch(e => this.onError(e));
  }
}
