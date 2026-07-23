export class IssueMaterialCommand {
    constructor(
        public readonly orderId: string,
        public readonly materialIssueId: string,
        public readonly quantity: number
    ) {}
}
