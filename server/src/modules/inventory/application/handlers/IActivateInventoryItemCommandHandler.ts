import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { ActivateInventoryItemCommand } from '../commands/ActivateInventoryItemCommand';
import { Result } from '../../../../core';

export interface IActivateInventoryItemCommandHandler extends ICommandHandler<ActivateInventoryItemCommand, Result<void>> {}
