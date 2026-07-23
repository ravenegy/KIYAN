export interface UpdateLookupRequest {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly isActive?: boolean;
}
