export class CompleteProductionOrderCommand {
    constructor(
        public readonly orderId: string,
        public readonly actualEndDate: string
    ) {}
}
