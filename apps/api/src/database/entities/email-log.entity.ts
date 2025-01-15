import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AuditLogsHook } from '../../audit-logs/audit-logs.hook';
import { User } from '../../core-modules/user/entities/user.entity';
import { EntityNames } from '../../config/entity-names';

@Entity({ name: EntityNames.EMAIL_LOG })
export class EmailLog extends AuditLogsHook {
  @ApiProperty()
  @Column({ nullable: false })
  recipientEmail: string;

  @ApiProperty()
  @Column({ nullable: false })
  senderEmail: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  subject: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  body: string;

  @ApiProperty({ required: false, type: Date })
  @CreateDateColumn({ type: 'timestamptz' })
  sentTime: string;

  @ApiProperty()
  @Column({ nullable: true })
  status: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  emailType: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user: User) => user.emailLogs)
  user: User;
}
