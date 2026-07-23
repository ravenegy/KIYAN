import { Result, IMediator } from '../../../../core';
import { IRoleWriteService } from '../interfaces';
import { CreateRoleCommand, UpdateRoleCommand, DeleteRoleCommand } from '../commands';

export class RoleWriteService implements IRoleWriteService {
  constructor(private readonly mediator: IMediator) {}

  public async createRole(payload: Readonly<{ name: string; description: string }>): Promise<Result<string>> {
    return this.mediator.send(new CreateRoleCommand(payload));
  }
  public async updateRole(payload: Readonly<{ id: string; name?: string; description?: string }>): Promise<Result<void>> {
    return this.mediator.send(new UpdateRoleCommand(payload));
  }
  public async deleteRole(id: string): Promise<Result<void>> {
    return this.mediator.send(new DeleteRoleCommand({ id }));
  }
}
