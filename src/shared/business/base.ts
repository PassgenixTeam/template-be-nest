export interface IBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string | Record<string, any>;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}
