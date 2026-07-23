import { Result, ICommandHandler } from '../../../../core';
import { ChangeUsernameCommand } from '../commands';


export interface IChangeUsernameCommandHandler extends ICommandHandler<ChangeUsernameCommand, Result<void>> {
}
