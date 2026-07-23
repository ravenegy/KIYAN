import { Result, ICommandHandler } from '../../../../core';
import { ChangePasswordCommand } from '../commands';


export interface IChangePasswordCommandHandler extends ICommandHandler<ChangePasswordCommand, Result<void>> {
}
