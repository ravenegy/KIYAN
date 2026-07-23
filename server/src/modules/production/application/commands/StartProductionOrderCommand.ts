export class StartProductionOrderCommand {
    constructor(
        public readonly orderId: string,
        public readonly actualStartDate: string
    ) {}
}
