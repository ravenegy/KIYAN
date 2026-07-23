export interface CreateLookupRequest {
  readonly code: string;
  readonly name: string;
  readonly description?: string;
  readonly isActive: boolean;
}
