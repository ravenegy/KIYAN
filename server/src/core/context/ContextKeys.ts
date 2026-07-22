export const ContextKeys = {
  RequestId: 'RequestId',
  CorrelationId: 'CorrelationId',
  TraceId: 'TraceId',
  UserId: 'UserId',
  TenantId: 'TenantId',
  Username: 'Username',
  Roles: 'Roles',
  Permissions: 'Permissions',
  Culture: 'Culture',
  Language: 'Language',
  Timezone: 'Timezone',
  IpAddress: 'IpAddress',
  DeviceId: 'DeviceId',
  IsAuthenticated: 'IsAuthenticated',
} as const;

export type ContextKey = typeof ContextKeys[keyof typeof ContextKeys];
