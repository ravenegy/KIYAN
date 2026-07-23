import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { AddBomComponentCommand } from '../commands/AddBomComponentCommand';
import { Result } from '../../../../core/results/Result';

export interface IAddBomComponentCommandHandler extends ICommandHandler<AddBomComponentCommand, Result<void>> {}
