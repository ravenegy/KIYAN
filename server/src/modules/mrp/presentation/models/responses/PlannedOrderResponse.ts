export interface PlannedOrderResponse {
  readonly id: string;
  readonly itemId: string;
  readonly quantity: number;
  readonly startDate: string;
  readonly endDate: string;
  readonly type: string;
  readonly status: string;
  readonly mrpRunId: string;
  readonly sourceRequirementId?: string;
  readonly version: number;
}
