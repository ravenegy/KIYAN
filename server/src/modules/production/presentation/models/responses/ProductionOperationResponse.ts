export interface ProductionOperationResponse {
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
