export interface UpdateOperationStatusRequest {
    readonly orderId: string;
    readonly operationId: string;
    readonly status: string;
}
