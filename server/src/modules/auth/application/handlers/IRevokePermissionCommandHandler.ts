import { Result } from '../../../../core/results/Result';
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { RevokePermissionCommand } from '../commands/RevokePermissionCommand';


export interface IRevokePermissionCommandHandler extends ICommandHandler<RevokePermissionCommand, Result<void>> {}
