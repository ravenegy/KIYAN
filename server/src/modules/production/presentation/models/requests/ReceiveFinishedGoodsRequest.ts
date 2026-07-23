export interface ReceiveFinishedGoodsRequest {
    readonly orderId: string;
    readonly itemId: string;
    readonly quantity: number;
}
