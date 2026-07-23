export class GetFinishedGoodReceiptsQuery {
    constructor(
        public readonly orderId: string,
        public readonly status?: string
    ) {}
}
