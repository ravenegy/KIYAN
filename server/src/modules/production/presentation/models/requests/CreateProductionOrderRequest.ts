export interface CreateProductionOrderRequest {
    readonly targetItemId: string;
    readonly plannedQuantity: number;
    readonly startDate: string;
    readonly endDate: string;
    readonly priority?: string;
}
