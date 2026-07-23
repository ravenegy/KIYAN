import { Result, ICommandHandler } from '../../../../core';
import { GrantPermissionCommand } from '../commands';


export interface IGrantPermissionCommandHandler extends ICommandHandler<GrantPermissionCommand, Result<void>> {
}
