export interface MaterialIssueResponse {
    readonly id: string;
    readonly itemId: string;
    readonly requiredQuantity: number;
    readonly issuedQuantity: number;
    readonly status: string;
    readonly createdAt: string;
    readonly version: number;
}
