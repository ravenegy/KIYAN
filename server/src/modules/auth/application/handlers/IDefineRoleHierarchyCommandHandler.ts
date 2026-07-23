import { Result } from '../../../../core/results/Result';
import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { DefineRoleHierarchyCommand } from '../commands/DefineRoleHierarchyCommand';


export interface IDefineRoleHierarchyCommandHandler extends ICommandHandler<DefineRoleHierarchyCommand, Result<string>> {}
