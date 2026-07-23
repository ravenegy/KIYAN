import { MrpRun } from '../../../domain/entities/MrpRun';
import { MrpRunId } from '../../../domain/shared/MrpRunId';
import { MrpRunStatus } from '../../../domain/enums/MrpRunStatus';
import { PlanningHorizon } from '../../../domain/value-objects/PlanningHorizon';
import { MrpRunPersistenceModel } from '../models/MrpRunPersistenceModel';

export class MrpRunPersistenceMapper {
  public static toDomain(model: MrpRunPersistenceModel): MrpRun {
    const idResult = MrpRunId.create(model.id);
    if (idResult.isFailure) throw new Error(idResult.error?.message);
    const id = idResult.value!;
    
    const horizonResult = PlanningHorizon.create(model.horizonStartDate, model.horizonEndDate);
    if (horizonResult.isFailure) throw new Error(horizonResult.error?.message);

    const mrpRunResult = MrpRun.create(id, {
      plantId: model.plantId,
      horizon: horizonResult.value!,
      status: model.status as MrpRunStatus,
      startedAt: model.startedAt || undefined,
      completedAt: model.completedAt || undefined,
      errorLog: model.errorLog || undefined,
    });

    if (mrpRunResult.isFailure) {
      throw new Error(`Failed to map MRP Run: ${mrpRunResult.error?.message}`);
    }

    const mrpRun = mrpRunResult.value!;
    mrpRun.clearDomainEvents();
    return mrpRun;
  }

  public static toPersistence(domain: MrpRun): MrpRunPersistenceModel {
    return {
      id: domain.id.value,
      plantId: domain.plantId,
      status: domain.status,
      horizonStartDate: domain.horizon.startDate,
      horizonEndDate: domain.horizon.endDate,
      startedAt: domain.startedAt || null,
      completedAt: domain.completedAt || null,
      errorLog: domain.errorLog || null,
      createdAt: new Date(), 
      updatedAt: new Date(),
    };
  }
}
