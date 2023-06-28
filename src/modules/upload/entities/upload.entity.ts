import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/common';
import { FILE_STATUS, IUpload } from 'src/shared/business/upload';

@Entity({ name: 'uploads' })
export class UploadEntity extends BaseEntity implements IUpload {
  @Column({ type: 'varchar', length: 50 })
  type!: string;

  @Column({ type: 'float' })
  size!: number;

  @Column({ type: 'varchar', length: 255 })
  url!: string;

  @Column({ type: 'varchar', length: 100 })
  key!: string;

  @Column({ type: 'enum', enum: FILE_STATUS })
  status!: FILE_STATUS;
}
