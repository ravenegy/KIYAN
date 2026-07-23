export interface FinishedGoodReceiptResponse {
    readonly id: string;
    readonly itemId: string;
    readonly quantity: number;
    readonly status: string;
    readonly createdAt: string;
    readonly version: number;
}
