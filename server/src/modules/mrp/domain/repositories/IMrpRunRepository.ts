import { IRepository } from '../../../../core/domain/repositories/IRepository';
import { MrpRun } from '../entities/MrpRun';
import { MrpRunId } from '../shared/MrpRunId';

export interface IMrpRunRepository extends IRepository<MrpRun, MrpRunId> {
  findLatestRun(): Promise<MrpRun | null>;
  findPendingRuns(): Promise<MrpRun[]>;
}
