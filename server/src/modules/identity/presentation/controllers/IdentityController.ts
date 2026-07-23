import { IIdentityApplicationService } from '../../application/interfaces/IIdentityApplicationService';
import { ApiResponse } from '../models/responses/ApiResponse';
import { Result } from '../../../../core';

export class IdentityController {
  constructor(private readonly identityService: IIdentityApplicationService) {}

  // Basic endpoints can be defined here, although mostly separated into Auth/Users/Roles/Permissions
}

