import { Result, ICommandHandler } from '../../../../core';
import { DeleteRoleCommand } from '../commands';


export interface IDeleteRoleCommandHandler extends ICommandHandler<DeleteRoleCommand, Result<void>> {
}
