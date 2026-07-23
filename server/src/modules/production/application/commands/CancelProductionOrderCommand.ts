export class CancelProductionOrderCommand {
    constructor(
        public readonly orderId: string,
        public readonly reason?: string
    ) {}
}
