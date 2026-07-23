import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { CreateInventoryItemCommand } from '../commands/CreateInventoryItemCommand';
import { Result } from '../../../../core';

export interface ICreateInventoryItemCommandHandler extends ICommandHandler<CreateInventoryItemCommand, Result<string>> {}
