import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { DeleteInventoryItemCommand } from '../commands/DeleteInventoryItemCommand';
import { Result } from '../../../../core';

export interface IDeleteInventoryItemCommandHandler extends ICommandHandler<DeleteInventoryItemCommand, Result<void>> {}
