import { Result, IMediator } from '../../../../core';
import { IPermissionApplicationService } from '../interfaces';

export class PermissionApplicationService implements IPermissionApplicationService {
  constructor(private readonly mediator: IMediator) {}

}
