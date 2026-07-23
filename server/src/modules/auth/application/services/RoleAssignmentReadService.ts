import { IMediator } from '../../../../core';
import { IRoleAssignmentReadService } from '../interfaces/IRoleAssignmentReadService';

export class RoleAssignmentReadService implements IRoleAssignmentReadService {
  constructor(private readonly mediator: IMediator) {}
}
