import { Result, ICommandHandler } from '../../../../core';
import { UpdatePermissionCommand } from '../commands';


export interface IUpdatePermissionCommandHandler extends ICommandHandler<UpdatePermissionCommand, Result<void>> {
}
