import { IMediator } from '../../../../core';
import { IRoleAssignmentWriteService } from '../interfaces/IRoleAssignmentWriteService';

export class RoleAssignmentWriteService implements IRoleAssignmentWriteService {
  constructor(private readonly mediator: IMediator) {}
}
