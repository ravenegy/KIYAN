import { Result, ICommandHandler } from '../../../../core';
import { UpdateRoleCommand } from '../commands';


export interface IUpdateRoleCommandHandler extends ICommandHandler<UpdateRoleCommand, Result<void>> {
}
