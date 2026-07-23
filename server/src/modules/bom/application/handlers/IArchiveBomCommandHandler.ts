import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { ArchiveBomCommand } from '../commands/ArchiveBomCommand';
import { Result } from '../../../../core/results/Result';

export interface IArchiveBomCommandHandler extends ICommandHandler<ArchiveBomCommand, Result<void>> {}
