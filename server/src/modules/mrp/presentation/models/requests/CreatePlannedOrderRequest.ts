export interface CreatePlannedOrderRequest {
  readonly itemId: string;
  readonly quantity: number;
  readonly startDate: string;
  readonly endDate: string;
  readonly orderType: string;
  readonly mrpRunId: string;
  readonly sourceRequirementId?: string;
}
