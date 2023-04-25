import { Column, Entity } from 'typeorm';
import { FILE_STATUS } from '../enum/upload.enum';
import { BaseEntity } from '@app/common';

@Entity({ name: 'uploads' })
export class UploadEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'float' })
  size: number;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 100 })
  key: string;

  @Column({ type: 'enum', enum: FILE_STATUS })
  status: FILE_STATUS;
}
