import { Result, ICommandHandler } from '../../../../core';
import { RevokePermissionCommand } from '../commands';


export interface IRevokePermissionCommandHandler extends ICommandHandler<RevokePermissionCommand, Result<void>> {
}
