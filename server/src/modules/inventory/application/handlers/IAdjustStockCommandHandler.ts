import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { AdjustStockCommand } from '../commands/AdjustStockCommand';
import { Result } from '../../../../core';

export interface IAdjustStockCommandHandler extends ICommandHandler<AdjustStockCommand, Result<void>> {}
