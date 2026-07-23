import { Result, IMediator } from '../../../../core';
import { IRoleApplicationService } from '../interfaces';

export class RoleApplicationService implements IRoleApplicationService {
  constructor(private readonly mediator: IMediator) {}

}
