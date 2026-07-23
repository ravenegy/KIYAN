export class GetProductionOrdersQuery {
    constructor(
        public readonly status?: string,
        public readonly itemId?: string,
        public readonly locationId?: string,
        public readonly startDate?: string,
        public readonly endDate?: string
    ) {}
}
