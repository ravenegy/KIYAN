import { Token } from '../../../core/di';
import { IBomApplicationService } from '../application/services/IBomApplicationService';
import { IBomMapper } from '../application/mappers/IBomMapper';
import { IBomValidator } from '../application/validators/IBomValidator';
import { IBomRepository } from '../domain/repositories/IBomRepository';
import { IDomainGuid } from '../../../core/domain/services/IDomainGuid';
import { BomCycleDetectionService } from '../domain/services/BomCycleDetectionService';

import { ActivateBomCommandHandler } from '../application/handlers/impl/ActivateBomCommandHandler';
import { AddBomComponentCommandHandler } from '../application/handlers/impl/AddBomComponentCommandHandler';
import { ArchiveBomCommandHandler } from '../application/handlers/impl/ArchiveBomCommandHandler';
import { CreateBomCommandHandler } from '../application/handlers/impl/CreateBomCommandHandler';
import { RemoveBomComponentCommandHandler } from '../application/handlers/impl/RemoveBomComponentCommandHandler';

import { GetActiveBomByTargetItemQueryHandler } from '../application/handlers/impl/GetActiveBomByTargetItemQueryHandler';
import { GetBomByIdQueryHandler } from '../application/handlers/impl/GetBomByIdQueryHandler';
import { GetBomsByTargetItemQueryHandler } from '../application/handlers/impl/GetBomsByTargetItemQueryHandler';
import { BomController } from '../presentation/controllers/BomController';
import { IBomIntegrationService } from '../integration/IBomIntegrationService';

export const BomModuleTokens = {
  // Integration Services
  IBomIntegrationService: new Token<IBomIntegrationService>('IBomIntegrationService'),

  // Handlers - Commands
  ActivateBomCommandHandler: new Token<ActivateBomCommandHandler>('ActivateBomCommandHandler'),
  AddBomComponentCommandHandler: new Token<AddBomComponentCommandHandler>('AddBomComponentCommandHandler'),
  ArchiveBomCommandHandler: new Token<ArchiveBomCommandHandler>('ArchiveBomCommandHandler'),
  CreateBomCommandHandler: new Token<CreateBomCommandHandler>('CreateBomCommandHandler'),
  RemoveBomComponentCommandHandler: new Token<RemoveBomComponentCommandHandler>('RemoveBomComponentCommandHandler'),
  
  // Handlers - Queries
  GetActiveBomByTargetItemQueryHandler: new Token<GetActiveBomByTargetItemQueryHandler>('GetActiveBomByTargetItemQueryHandler'),
  GetBomByIdQueryHandler: new Token<GetBomByIdQueryHandler>('GetBomByIdQueryHandler'),
  GetBomsByTargetItemQueryHandler: new Token<GetBomsByTargetItemQueryHandler>('GetBomsByTargetItemQueryHandler'),
  
  // Application Services
  IBomApplicationService: new Token<IBomApplicationService>('IBomApplicationService'),
  
  // Mappers
  IBomMapper: new Token<IBomMapper>('IBomMapper'),
  
  // Validators
  IBomValidator: new Token<IBomValidator>('IBomValidator'),

  // Repositories
  IBomRepository: new Token<IBomRepository>('IBomRepository'),
  
  // Services
  IDomainGuid: new Token<IDomainGuid>('IDomainGuid'),
  BomCycleDetectionService: new Token<BomCycleDetectionService>('BomCycleDetectionService'),

  // Presentation
  BomController: new Token<BomController>('BomController')
};
