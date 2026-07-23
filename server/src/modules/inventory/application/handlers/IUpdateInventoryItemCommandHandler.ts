import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { UpdateInventoryItemCommand } from '../commands/UpdateInventoryItemCommand';
import { Result } from '../../../../core';

export interface IUpdateInventoryItemCommandHandler extends ICommandHandler<UpdateInventoryItemCommand, Result<void>> {}
