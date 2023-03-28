import { Column, Entity, OneToMany } from 'typeorm';
import { SessionEntity } from '../../session/entities/session.entity';
import { BaseEntity, ROLE } from '@app/common';
import { Expose } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    default:
      // eslint-disable-next-line max-len
      'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=',
  })
  avatarUrl: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @Column({ default: ROLE.FREELANCE })
  role: string;

  @Expose()
  loginSession: SessionEntity;

  @Expose()
  cacheId: string;
}
