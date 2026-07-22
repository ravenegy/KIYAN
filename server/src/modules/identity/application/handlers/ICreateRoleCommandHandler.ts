import { Result, ICommandHandler } from '../../../../core';
import { CreateRoleCommand } from '../commands';


export interface ICreateRoleCommandHandler extends ICommandHandler<CreateRoleCommand, Result<string>> {
}
