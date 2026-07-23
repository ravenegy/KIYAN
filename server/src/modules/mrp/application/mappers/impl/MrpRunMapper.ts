import { IMrpRunMapper } from '../IMrpRunMapper';
import { MrpRun } from '../../../domain/entities/MrpRun';
import { MrpRunDto } from '../../dto/MrpRunDto';

export class MrpRunMapper implements IMrpRunMapper {
  public toDto(mrpRun: MrpRun): MrpRunDto {
    return {
      id: mrpRun.id.value,
      plantId: mrpRun.plantId,
      status: mrpRun.status,
      horizonStartDate: mrpRun.horizon.startDate.toISOString(),
      horizonEndDate: mrpRun.horizon.endDate.toISOString(),
      startedAt: mrpRun.startedAt?.toISOString(),
      completedAt: mrpRun.completedAt?.toISOString(),
      errorLog: mrpRun.errorLog,
      version: mrpRun.version
    };
  }
}
