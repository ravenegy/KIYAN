export interface AddMaterialIssueRequest {
    readonly orderId: string;
    readonly itemId: string;
    readonly requiredQuantity: number;
}
