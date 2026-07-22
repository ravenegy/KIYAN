import { Result, ICommandHandler } from '../../../../core';
import { DeleteUserCommand } from '../commands';


export interface IDeleteUserCommandHandler extends ICommandHandler<DeleteUserCommand, Result<void>> {
}
