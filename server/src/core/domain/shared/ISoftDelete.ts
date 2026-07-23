export interface ISoftDelete {
  readonly isDeleted: boolean;
  readonly deletedAt?: Date;
  readonly deletedBy?: string;
}
