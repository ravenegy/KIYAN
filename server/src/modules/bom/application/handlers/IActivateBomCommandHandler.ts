import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { ActivateBomCommand } from '../commands/ActivateBomCommand';
import { Result } from '../../../../core/results/Result';

export interface IActivateBomCommandHandler extends ICommandHandler<ActivateBomCommand, Result<void>> {}
