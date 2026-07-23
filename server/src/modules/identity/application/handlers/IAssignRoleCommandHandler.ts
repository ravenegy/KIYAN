import { Result, ICommandHandler } from '../../../../core';
import { AssignRoleCommand } from '../commands';


export interface IAssignRoleCommandHandler extends ICommandHandler<AssignRoleCommand, Result<void>> {
}
