import { IRequestContext } from './IRequestContext';

export interface RequestContextOptions {
  requestId: string;
  correlationId: string;
  traceId: string;
  userId?: string;
  tenantId?: string;
  username?: string;
  roles?: string[];
  permissions?: string[];
  culture?: string;
  language?: string;
  timezone?: string;
  ipAddress?: string;
  deviceId?: string;
  isAuthenticated?: boolean;
  items?: Record<string, unknown>;
}

export class RequestContext implements IRequestContext {
  public readonly requestId: string;
  public readonly correlationId: string;
  public readonly traceId: string;
  public readonly userId?: string;
  public readonly tenantId?: string;
  public readonly username?: string;
  public readonly roles: ReadonlyArray<string>;
  public readonly permissions: ReadonlyArray<string>;
  public readonly culture: string;
  public readonly language: string;
  public readonly timezone: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly isAuthenticated: boolean;
  public readonly items: Readonly<Record<string, unknown>>;

  constructor(options: RequestContextOptions) {
    this.requestId = options.requestId;
    this.correlationId = options.correlationId;
    this.traceId = options.traceId;
    this.userId = options.userId;
    this.tenantId = options.tenantId;
    this.username = options.username;
    this.roles = Object.freeze([...(options.roles || [])]);
    this.permissions = Object.freeze([...(options.permissions || [])]);
    this.culture = options.culture || 'en-US';
    this.language = options.language || 'en';
    this.timezone = options.timezone || 'UTC';
    this.ipAddress = options.ipAddress;
    this.deviceId = options.deviceId;
    this.isAuthenticated = options.isAuthenticated ?? false;
    this.items = Object.freeze({ ...options.items });
  }

  public getItem<T>(key: string): T | undefined {
    return this.items[key] as T | undefined;
  }
}
