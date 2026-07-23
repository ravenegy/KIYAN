import { Result, ICommandHandler } from '../../../../core';
import { DeletePermissionCommand } from '../commands';


export interface IDeletePermissionCommandHandler extends ICommandHandler<DeletePermissionCommand, Result<void>> {
}
