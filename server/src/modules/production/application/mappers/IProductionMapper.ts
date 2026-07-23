import { ProductionOrder, ProductionOperation, ProductionMaterialIssue, FinishedGoodReceipt } from '../../domain/entities';
import { ProductionOrderDto, ProductionOperationDto, MaterialIssueDto, FinishedGoodReceiptDto } from '../dto';

export interface IProductionMapper {
    toProductionOrderDto(entity: ProductionOrder): ProductionOrderDto;
    toProductionOperationDto(entity: ProductionOperation): ProductionOperationDto;
    toMaterialIssueDto(entity: ProductionMaterialIssue): MaterialIssueDto;
    toFinishedGoodReceiptDto(entity: FinishedGoodReceipt): FinishedGoodReceiptDto;
}
