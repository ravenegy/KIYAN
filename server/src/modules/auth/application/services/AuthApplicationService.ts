import { IMediator } from '../../../../core';
import { IAuthApplicationService } from '../interfaces/IAuthApplicationService';

export class AuthApplicationService implements IAuthApplicationService {
  constructor(private readonly mediator: IMediator) {}
}
