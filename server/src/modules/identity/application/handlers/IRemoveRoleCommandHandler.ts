import { Result, ICommandHandler } from '../../../../core';
import { RemoveRoleCommand } from '../commands';


export interface IRemoveRoleCommandHandler extends ICommandHandler<RemoveRoleCommand, Result<void>> {
}
