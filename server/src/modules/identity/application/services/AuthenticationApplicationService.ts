import { Result, IMediator } from '../../../../core';
import { IAuthenticationApplicationService } from '../interfaces';

export class AuthenticationApplicationService implements IAuthenticationApplicationService {
  constructor(private readonly mediator: IMediator) {}

}
