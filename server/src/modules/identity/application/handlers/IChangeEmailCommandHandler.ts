import { Result, ICommandHandler } from '../../../../core';
import { ChangeEmailCommand } from '../commands';


export interface IChangeEmailCommandHandler extends ICommandHandler<ChangeEmailCommand, Result<void>> {
}
