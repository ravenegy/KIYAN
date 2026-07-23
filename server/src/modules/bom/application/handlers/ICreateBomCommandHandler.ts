import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { CreateBomCommand } from '../commands/CreateBomCommand';
import { Result } from '../../../../core/results/Result';

export interface ICreateBomCommandHandler extends ICommandHandler<CreateBomCommand, Result<string>> {}
