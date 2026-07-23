import { MrpRun } from '../../domain/entities/MrpRun';
import { MrpRunDto } from '../dto/MrpRunDto';

export interface IMrpRunMapper {
  toDto(mrpRun: MrpRun): MrpRunDto;
}
