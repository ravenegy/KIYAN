import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { RemoveBomComponentCommand } from '../commands/RemoveBomComponentCommand';
import { Result } from '../../../../core/results/Result';

export interface IRemoveBomComponentCommandHandler extends ICommandHandler<RemoveBomComponentCommand, Result<void>> {}
