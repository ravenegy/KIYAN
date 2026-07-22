import { Result, ICommandHandler } from '../../../../core';
import { CreateUserCommand } from '../commands';


export interface ICreateUserCommandHandler extends ICommandHandler<CreateUserCommand, Result<string>> {
}
