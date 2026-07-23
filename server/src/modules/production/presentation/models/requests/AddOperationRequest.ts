export interface AddOperationRequest {
    readonly orderId: string;
    readonly sequence: number;
    readonly name: string;
    readonly workCenterId: string;
    readonly setupTimeMinutes: number;
    readonly runTimeMinutes: number;
}
