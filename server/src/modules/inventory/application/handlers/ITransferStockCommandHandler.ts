import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { TransferStockCommand } from '../commands/TransferStockCommand';
import { Result } from '../../../../core';

export interface ITransferStockCommandHandler extends ICommandHandler<TransferStockCommand, Result<void>> {}
