import { Result, ICommandHandler } from '../../../../core';
import { UpdateUserCommand } from '../commands';


export interface IUpdateUserCommandHandler extends ICommandHandler<UpdateUserCommand, Result<void>> {
}
