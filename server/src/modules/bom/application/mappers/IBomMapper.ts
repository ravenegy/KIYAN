import { BillOfMaterial } from '../../domain/entities/BillOfMaterial';
import { BomDto } from '../dto/BomDto';
import { BomSummaryDto } from '../dto/BomSummaryDto';

export interface IBomMapper {
  toDto(bom: BillOfMaterial): BomDto;
  toSummaryDto(bom: BillOfMaterial): BomSummaryDto;
}
