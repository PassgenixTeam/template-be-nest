import { BaseEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ISession } from 'src/shared/business/session';

@Entity({ name: 'sessions' })
export class SessionEntity extends BaseEntity implements ISession {
  @Column({ type: 'varchar', length: 1000 })
  accessToken!: string;

  @Column({ type: 'varchar', length: 1000 })
  refreshToken!: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  expiredAt!: Date;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user?: UserEntity;
}
