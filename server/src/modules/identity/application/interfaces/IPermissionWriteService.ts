import { Result } from '../../../../core';

export interface IPermissionWriteService {
  createPermission(payload: Readonly<{ name: string; code: string; description: string; effect: string }>): Promise<Result<string>>;
  updatePermission(payload: Readonly<{ id: string; name?: string; description?: string; effect?: string }>): Promise<Result<void>>;
  deletePermission(id: string): Promise<Result<void>>;
}
