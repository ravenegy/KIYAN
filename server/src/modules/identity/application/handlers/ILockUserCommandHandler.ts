import { Result, ICommandHandler } from '../../../../core';
import { LockUserCommand } from '../commands';


export interface ILockUserCommandHandler extends ICommandHandler<LockUserCommand, Result<void>> {
}
