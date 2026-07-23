import { Result, IMediator } from '../../../../core';
import { IPermissionWriteService } from '../interfaces';
import { CreatePermissionCommand, UpdatePermissionCommand, DeletePermissionCommand } from '../commands';

export class PermissionWriteService implements IPermissionWriteService {
  constructor(private readonly mediator: IMediator) {}

  public async createPermission(payload: Readonly<{ name: string; code: string; description: string; effect: string }>): Promise<Result<string>> {
    return this.mediator.send(new CreatePermissionCommand(payload));
  }
  public async updatePermission(payload: Readonly<{ id: string; name?: string; description?: string; effect?: string }>): Promise<Result<void>> {
    return this.mediator.send(new UpdatePermissionCommand(payload));
  }
  public async deletePermission(id: string): Promise<Result<void>> {
    return this.mediator.send(new DeletePermissionCommand({ id }));
  }
}
