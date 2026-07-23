export interface ProductionOrderDto {
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
    readonly operations: readonly ProductionOperationDto[];
    readonly materialIssues: readonly MaterialIssueDto[];
    readonly receipts: readonly FinishedGoodReceiptDto[];
    readonly createdAt: string;
    readonly version: number;
}

export interface ProductionOperationDto {
    readonly id: string;
    readonly sequence: number;
    readonly name: string;
    readonly workCenterId: string;
    readonly setupTimeMinutes: number;
    readonly runTimeMinutes: number;
    readonly status: string;
    readonly createdAt: string;
    readonly version: number;
}

export interface MaterialIssueDto {
    readonly id: string;
    readonly itemId: string;
    readonly requiredQuantity: number;
    readonly issuedQuantity: number;
    readonly status: string;
    readonly createdAt: string;
    readonly version: number;
}

export interface FinishedGoodReceiptDto {
    readonly id: string;
    readonly itemId: string;
    readonly quantity: number;
    readonly status: string;
    readonly createdAt: string;
    readonly version: number;
}

export interface ProductionSummaryDto {
    readonly orderId: string;
    readonly targetItemId: string;
    readonly status: string;
    readonly plannedQuantity: number;
    readonly actualQuantity: number;
    readonly percentComplete: number;
}
