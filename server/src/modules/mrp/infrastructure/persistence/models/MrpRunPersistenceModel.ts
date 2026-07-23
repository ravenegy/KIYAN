export interface MrpRunPersistenceModel {
  id: string;
  plantId: string;
  status: string;
  horizonStartDate: Date;
  horizonEndDate: Date;
  startedAt?: Date | null;
  completedAt?: Date | null;
  errorLog?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
