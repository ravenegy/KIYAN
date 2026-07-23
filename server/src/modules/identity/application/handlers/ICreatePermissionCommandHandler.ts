import { Result, ICommandHandler } from '../../../../core';
import { CreatePermissionCommand } from '../commands';


export interface ICreatePermissionCommandHandler extends ICommandHandler<CreatePermissionCommand, Result<string>> {
}
