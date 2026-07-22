import { Result, ICommandHandler } from '../../../../core';
import { DeactivateUserCommand } from '../commands';


export interface IDeactivateUserCommandHandler extends ICommandHandler<DeactivateUserCommand, Result<void>> {
}
