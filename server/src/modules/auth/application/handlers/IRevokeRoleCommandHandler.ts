import { Result } from '../../../../core/results/Result';
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { RevokeRoleCommand } from '../commands/RevokeRoleCommand';


export interface IRevokeRoleCommandHandler extends ICommandHandler<RevokeRoleCommand, Result<void>> {}
