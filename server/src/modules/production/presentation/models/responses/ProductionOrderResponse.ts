import { ProductionOperationResponse } from './ProductionOperationResponse';
import { MaterialIssueResponse } from './MaterialIssueResponse';
import { FinishedGoodReceiptResponse } from './FinishedGoodReceiptResponse';

export interface ProductionOrderResponse {
    readonly id: string;
    readonly targetItemId: string;
    readonly plannedQuantity: number;
    readonly actualQuantity: number;
    readonly startDate: string;
    readonly endDate: string;
    readonly actualStartDate?: string;
    readonly actualEndDate?: string;
    readonly status: string;
    readonly priority: string;
    readonly operations: readonly ProductionOperationResponse[];
    readonly materialIssues: readonly MaterialIssueResponse[];
    readonly receipts: readonly FinishedGoodReceiptResponse[];
    readonly createdAt: string;
    readonly version: number;
}
