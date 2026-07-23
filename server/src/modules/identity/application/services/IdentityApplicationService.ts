import { Result, IMediator } from '../../../../core';
import { IIdentityApplicationService } from '../interfaces';

export class IdentityApplicationService implements IIdentityApplicationService {
  constructor(private readonly mediator: IMediator) {}

}
