import { Result, ICommandHandler } from '../../../../core';
import { UnlockUserCommand } from '../commands';


export interface IUnlockUserCommandHandler extends ICommandHandler<UnlockUserCommand, Result<void>> {
}
