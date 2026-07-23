export class CreateProductionOrderCommand {
    constructor(
        public readonly targetItemId: string,
        public readonly plannedQuantity: number,
        public readonly startDate: string,
        public readonly endDate: string,
        public readonly priority: string
    ) {}
}
