export class GetProductionOperationsQuery {
    constructor(
        public readonly orderId: string,
        public readonly workCenterId?: string,
        public readonly status?: string
    ) {}
}
