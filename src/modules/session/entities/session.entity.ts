import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@app/common';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'sessions' })
export class SessionEntity extends BaseEntity {
  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  expiredAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user: UserEntity;
}
