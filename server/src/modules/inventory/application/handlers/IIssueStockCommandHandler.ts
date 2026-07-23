import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { IssueStockCommand } from '../commands/IssueStockCommand';
import { Result } from '../../../../core';

export interface IIssueStockCommandHandler extends ICommandHandler<IssueStockCommand, Result<void>> {}
