export class AddMaterialIssueCommand {
    constructor(
        public readonly orderId: string,
        public readonly itemId: string,
        public readonly requiredQuantity: number
    ) {}
}
