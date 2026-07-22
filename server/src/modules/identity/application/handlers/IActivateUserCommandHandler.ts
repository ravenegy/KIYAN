import { Result, ICommandHandler } from '../../../../core';
import { ActivateUserCommand } from '../commands';


export interface IActivateUserCommandHandler extends ICommandHandler<ActivateUserCommand, Result<void>> {
}
