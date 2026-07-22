import { Result, ICommandHandler } from '../../../../core';
import { ResetPasswordCommand } from '../commands';


export interface IResetPasswordCommandHandler extends ICommandHandler<ResetPasswordCommand, Result<void>> {
}
