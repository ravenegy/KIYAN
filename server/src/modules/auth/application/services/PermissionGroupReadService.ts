import { IMediator } from '../../../../core';
import { IPermissionGroupReadService } from '../interfaces/IPermissionGroupReadService';

export class PermissionGroupReadService implements IPermissionGroupReadService {
  constructor(private readonly mediator: IMediator) {}
}
