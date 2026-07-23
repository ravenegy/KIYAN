export interface MrpRunResponse {
  readonly id: string;
  readonly plantId: string;
  readonly status: string;
  readonly horizonStartDate: string;
  readonly horizonEndDate: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly errorDetails?: string;
  readonly plannedOrdersCount: number;
}
