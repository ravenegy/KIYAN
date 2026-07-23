export class GetMaterialIssuesQuery {
    constructor(
        public readonly orderId: string,
        public readonly status?: string
    ) {}
}
