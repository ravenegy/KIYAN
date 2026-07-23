export interface IdentityModuleOptions {
  enableRegistration?: boolean;
  tokenExpirationMinutes?: number;
  refreshTokenExpirationDays?: number;
  passwordPolicy?: {
    minLength: number;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
}

export interface IdentityModuleConfiguration {
  options: IdentityModuleOptions;
  version: string;
  name: string;
}

export const IdentityModuleManifest: IdentityModuleConfiguration = {
  name: 'IdentityModule',
  version: '1.0.0',
  options: {
    enableRegistration: true,
    tokenExpirationMinutes: 15,
    refreshTokenExpirationDays: 7,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    }
  }
};
