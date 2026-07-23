export interface IRequestContext {
  readonly requestId: string;
  readonly correlationId: string;
  readonly traceId: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly username?: string;
  readonly roles: ReadonlyArray<string>;
  readonly permissions: ReadonlyArray<string>;
  readonly culture: string;
  readonly language: string;
  readonly timezone: string;
  readonly ipAddress?: string;
  readonly deviceId?: string;
  readonly isAuthenticated: boolean;
  readonly items: Readonly<Record<string, unknown>>;
  
  getItem<T>(key: string): T | undefined;
}
