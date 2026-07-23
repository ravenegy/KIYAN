import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { DeactivateInventoryItemCommand } from '../commands/DeactivateInventoryItemCommand';
import { Result } from '../../../../core';

export interface IDeactivateInventoryItemCommandHandler extends ICommandHandler<DeactivateInventoryItemCommand, Result<void>> {}
