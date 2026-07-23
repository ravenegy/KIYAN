import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { ReceiveStockCommand } from '../commands/ReceiveStockCommand';
import { Result } from '../../../../core';

export interface IReceiveStockCommandHandler extends ICommandHandler<ReceiveStockCommand, Result<void>> {}
