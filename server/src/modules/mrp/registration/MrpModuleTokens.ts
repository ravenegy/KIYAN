import { Token } from '../../../core/di';
import { IMrpCommandService } from '../application/services/IMrpCommandService';
import { IMrpQueryService } from '../application/services/IMrpQueryService';
import { IMrpRunMapper } from '../application/mappers/IMrpRunMapper';
import { IPlannedOrderMapper } from '../application/mappers/IPlannedOrderMapper';
import { IMaterialRequirementMapper } from '../application/mappers/IMaterialRequirementMapper';
import { IMrpValidator } from '../application/validators/IMrpValidator';
import { IMrpRunRepository } from '../domain/repositories/IMrpRunRepository';
import { IPlannedOrderRepository } from '../domain/repositories/IPlannedOrderRepository';
import { IMaterialRequirementRepository } from '../domain/repositories/IMaterialRequirementRepository';

import { CancelMrpRunCommandHandler } from '../application/handlers/commands/CancelMrpRunCommandHandler';
import { CancelPlannedOrderCommandHandler } from '../application/handlers/commands/CancelPlannedOrderCommandHandler';
import { CompleteMrpRunCommandHandler } from '../application/handlers/commands/CompleteMrpRunCommandHandler';
import { CreateMrpRunCommandHandler } from '../application/handlers/commands/CreateMrpRunCommandHandler';
import { CreatePlannedOrderCommandHandler } from '../application/handlers/commands/CreatePlannedOrderCommandHandler';
import { FirmPlannedOrderCommandHandler } from '../application/handlers/commands/FirmPlannedOrderCommandHandler';
import { ReleasePlannedOrderCommandHandler } from '../application/handlers/commands/ReleasePlannedOrderCommandHandler';
import { StartMrpRunCommandHandler } from '../application/handlers/commands/StartMrpRunCommandHandler';

import { GetMaterialRequirementsQueryHandler } from '../application/handlers/queries/GetMaterialRequirementsQueryHandler';
import { GetMrpRunByIdQueryHandler } from '../application/handlers/queries/GetMrpRunByIdQueryHandler';
import { GetPlannedOrderByIdQueryHandler } from '../application/handlers/queries/GetPlannedOrderByIdQueryHandler';
import { GetPlannedOrdersQueryHandler } from '../application/handlers/queries/GetPlannedOrdersQueryHandler';
import { SearchPlannedOrdersQueryHandler } from '../application/handlers/queries/SearchPlannedOrdersQueryHandler';
import { IMrpIntegrationService } from '../integration/IMrpIntegrationService';

export const MrpModuleTokens = {
  // Handlers - Commands
  CancelMrpRunCommandHandler: new Token<CancelMrpRunCommandHandler>('CancelMrpRunCommandHandler'),
  CancelPlannedOrderCommandHandler: new Token<CancelPlannedOrderCommandHandler>('CancelPlannedOrderCommandHandler'),
  CompleteMrpRunCommandHandler: new Token<CompleteMrpRunCommandHandler>('CompleteMrpRunCommandHandler'),
  CreateMrpRunCommandHandler: new Token<CreateMrpRunCommandHandler>('CreateMrpRunCommandHandler'),
  CreatePlannedOrderCommandHandler: new Token<CreatePlannedOrderCommandHandler>('CreatePlannedOrderCommandHandler'),
  FirmPlannedOrderCommandHandler: new Token<FirmPlannedOrderCommandHandler>('FirmPlannedOrderCommandHandler'),
  ReleasePlannedOrderCommandHandler: new Token<ReleasePlannedOrderCommandHandler>('ReleasePlannedOrderCommandHandler'),
  StartMrpRunCommandHandler: new Token<StartMrpRunCommandHandler>('StartMrpRunCommandHandler'),

  // Handlers - Queries
  GetMaterialRequirementsQueryHandler: new Token<GetMaterialRequirementsQueryHandler>('GetMaterialRequirementsQueryHandler'),
  GetMrpRunByIdQueryHandler: new Token<GetMrpRunByIdQueryHandler>('GetMrpRunByIdQueryHandler'),
  GetPlannedOrderByIdQueryHandler: new Token<GetPlannedOrderByIdQueryHandler>('GetPlannedOrderByIdQueryHandler'),
  GetPlannedOrdersQueryHandler: new Token<GetPlannedOrdersQueryHandler>('GetPlannedOrdersQueryHandler'),
  SearchPlannedOrdersQueryHandler: new Token<SearchPlannedOrdersQueryHandler>('SearchPlannedOrdersQueryHandler'),

  // Application Services
  IMrpCommandService: new Token<IMrpCommandService>('IMrpCommandService'),
  IMrpQueryService: new Token<IMrpQueryService>('IMrpQueryService'),

  // Mappers
  IMrpRunMapper: new Token<IMrpRunMapper>('IMrpRunMapper'),
  IPlannedOrderMapper: new Token<IPlannedOrderMapper>('IPlannedOrderMapper'),
  IMaterialRequirementMapper: new Token<IMaterialRequirementMapper>('IMaterialRequirementMapper'),

  // Validators
  IMrpValidator: new Token<IMrpValidator<any>>('IMrpValidator'),

  // Integration Services
  IMrpIntegrationService: new Token<IMrpIntegrationService>('IMrpIntegrationService'),

  // Repositories
  IMrpRunRepository: new Token<IMrpRunRepository>('IMrpRunRepository'),
  IPlannedOrderRepository: new Token<IPlannedOrderRepository>('IPlannedOrderRepository'),
  IMaterialRequirementRepository: new Token<IMaterialRequirementRepository>('IMaterialRequirementRepository'),
};
