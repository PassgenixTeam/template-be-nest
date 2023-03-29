import { Column, Entity } from 'typeorm';
import { FILE_STATUS } from '../enum/upload.enum';

@Entity({ name: 'uploads' })
export class UploadEntity {
  @Column()
  id: number;

  @Column()
  type: string;

  @Column()
  size: number;

  @Column()
  url: string;

  @Column()
  key: string;

  @Column({ type: 'enum', enum: FILE_STATUS })
  status: FILE_STATUS;
}
