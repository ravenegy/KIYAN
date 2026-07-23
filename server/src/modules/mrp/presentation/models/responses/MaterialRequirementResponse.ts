export interface MaterialRequirementResponse {
  readonly id: string;
  readonly itemId: string;
  readonly quantity: number;
  readonly requiredDate: string;
  readonly sourceType: string;
  readonly sourceId?: string;
  readonly mrpRunId: string;
  readonly isSatisfied: boolean;
  readonly version: number;
}
