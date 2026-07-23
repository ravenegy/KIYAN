export interface LookupResponse {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly description?: string;
  readonly isActive: boolean;
}
