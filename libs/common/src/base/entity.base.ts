import { IBase } from 'src/shared/business/base';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity implements IBase {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at',
  })
  updatedAt!: Date;

  @Column({ nullable: true, type: 'uuid' })
  createdBy?: string | Record<string, any>;

  @Column({ nullable: true, type: 'uuid' })
  updatedBy?: string;

  @DeleteDateColumn({
    type: 'timestamp without time zone',
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @Column({ nullable: true, type: 'uuid' })
  deletedBy?: string;
}
