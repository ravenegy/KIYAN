import { IProductionMapper } from '../IProductionMapper';
import { ProductionOrder, ProductionOperation, ProductionMaterialIssue, FinishedGoodReceipt } from '../../../domain/entities';
import { ProductionOrderDto, ProductionOperationDto, MaterialIssueDto, FinishedGoodReceiptDto } from '../../dto';

export class ProductionMapper implements IProductionMapper {
    public toProductionOrderDto(entity: ProductionOrder): ProductionOrderDto {
        return {
            id: entity.id.value,
            targetItemId: entity.targetItemId,
            plannedQuantity: entity.plannedQuantity.amount,
            actualQuantity: entity.actualQuantity.amount,
            startDate: entity.startDate.toISOString(),
            endDate: entity.endDate.toISOString(),
            actualStartDate: entity.actualStartDate?.toISOString(),
            actualEndDate: entity.actualEndDate?.toISOString(),
            status: entity.status,
            priority: entity.priority,
            operations: entity.operations.map(op => this.toProductionOperationDto(op)),
            materialIssues: entity.materialIssues.map(mi => this.toMaterialIssueDto(mi)),
            receipts: entity.receipts.map(r => this.toFinishedGoodReceiptDto(r)),
            createdAt: entity.createdAt.toISOString(),
            version: entity.version
        };
    }

    public toProductionOperationDto(entity: ProductionOperation): ProductionOperationDto {
        return {
            id: entity.id.value,
            sequence: entity.sequence,
            name: entity.name,
            workCenterId: entity.workCenterId.value,
            setupTimeMinutes: entity.setupTime.minutes,
            runTimeMinutes: entity.runTime.minutes,
            status: entity.status,
            createdAt: entity.createdAt.toISOString(),
            version: entity.version
        };
    }

    public toMaterialIssueDto(entity: ProductionMaterialIssue): MaterialIssueDto {
        return {
            id: entity.id.value,
            itemId: entity.itemId,
            requiredQuantity: entity.requiredQuantity.amount,
            issuedQuantity: entity.issuedQuantity.amount,
            status: entity.status,
            createdAt: entity.createdAt.toISOString(),
            version: entity.version
        };
    }

    public toFinishedGoodReceiptDto(entity: FinishedGoodReceipt): FinishedGoodReceiptDto {
        return {
            id: entity.id.value,
            itemId: entity.itemId,
            quantity: entity.quantity.amount,
            status: entity.status,
            createdAt: entity.createdAt.toISOString(),
            version: entity.version
        };
    }
}
