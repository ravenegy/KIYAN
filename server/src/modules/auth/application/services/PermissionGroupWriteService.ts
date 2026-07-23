import { IMediator } from '../../../../core';
import { IPermissionGroupWriteService } from '../interfaces/IPermissionGroupWriteService';

export class PermissionGroupWriteService implements IPermissionGroupWriteService {
  constructor(private readonly mediator: IMediator) {}
}
