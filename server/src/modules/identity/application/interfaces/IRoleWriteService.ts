import { Result } from '../../../../core';

export interface IRoleWriteService {
  createRole(payload: Readonly<{ name: string; description: string }>): Promise<Result<string>>;
  updateRole(payload: Readonly<{ id: string; name?: string; description?: string }>): Promise<Result<void>>;
  deleteRole(id: string): Promise<Result<void>>;
}
