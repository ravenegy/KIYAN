import { IBomMapper } from '../IBomMapper';
import { BillOfMaterial } from '../../../domain/entities/BillOfMaterial';
import { BomDto } from '../../dto/BomDto';
import { BomSummaryDto } from '../../dto/BomSummaryDto';

export class BomMapper implements IBomMapper {
  public toDto(bom: BillOfMaterial): BomDto {
    return {
      id: bom.id.value,
      name: bom.name,
      targetItemId: bom.targetItemId.value,
      status: bom.status,
      version: bom.bomVersion.value,
      components: (bom.components as any).map(c => ({
        id: c.id.value,
        bomId: c.bomId.value,
        itemId: c.itemId.value,
        quantity: c.quantity.value,
        unitOfMeasure: c.unitOfMeasure,
        scrapPercentage: c.scrapPercentage
      })),
      createdAt: bom.createdAt.toISOString(),
      updatedAt: bom.updatedAt?.toISOString()
    };
  }

  public toSummaryDto(bom: BillOfMaterial): BomSummaryDto {
    return {
      id: bom.id.value,
      name: bom.name,
      targetItemId: bom.targetItemId.value,
      status: bom.status,
      version: bom.bomVersion.value,
      createdAt: bom.createdAt.toISOString()
    };
  }
}
