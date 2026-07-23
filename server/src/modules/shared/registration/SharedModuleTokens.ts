import { Token } from '../../../core/di';
import { ISharedLookupService, ILocalizationApplicationService, IReferenceDataService } from '../application/interfaces';
import { SharedLookupController, LocalizationController, ReferenceDataController } from '../presentation/controllers';
import { SharedLookupEndpoints, LocalizationEndpoints, ReferenceDataEndpoints } from '../presentation/endpoints';
import { LookupPersistenceMapper } from '../infrastructure/mappers';
import { CreateLookupValidator, UpdateLookupValidator } from '../application/validators';
import { CreateLookupCommandHandler, UpdateLookupCommandHandler, DeleteLookupCommandHandler, GetLookupByIdQueryHandler, GetLookupsQueryHandler, SearchLookupsQueryHandler } from '../application/handlers';

export const SharedModuleTokens = {
  // Handlers
  CreateLookupCommandHandler: new Token<CreateLookupCommandHandler>('CreateLookupCommandHandler'),
  UpdateLookupCommandHandler: new Token<UpdateLookupCommandHandler>('UpdateLookupCommandHandler'),
  DeleteLookupCommandHandler: new Token<DeleteLookupCommandHandler>('DeleteLookupCommandHandler'),
  GetLookupByIdQueryHandler: new Token<GetLookupByIdQueryHandler>('GetLookupByIdQueryHandler'),
  GetLookupsQueryHandler: new Token<GetLookupsQueryHandler>('GetLookupsQueryHandler'),
  SearchLookupsQueryHandler: new Token<SearchLookupsQueryHandler>('SearchLookupsQueryHandler'),

  // Application Services
  ISharedLookupService: new Token<ISharedLookupService>('ISharedLookupService'),
  ILocalizationApplicationService: new Token<ILocalizationApplicationService>('ILocalizationApplicationService'),
  IReferenceDataService: new Token<IReferenceDataService>('IReferenceDataService'),
  
  // Mappers
  LookupPersistenceMapper: new Token<LookupPersistenceMapper>('LookupPersistenceMapper'),

  // Validators
  CreateLookupValidator: new Token<CreateLookupValidator>('CreateLookupValidator'),
  UpdateLookupValidator: new Token<UpdateLookupValidator>('UpdateLookupValidator'),

  // Controllers
  SharedLookupController: new Token<SharedLookupController>('SharedLookupController'),
  LocalizationController: new Token<LocalizationController>('LocalizationController'),
  ReferenceDataController: new Token<ReferenceDataController>('ReferenceDataController'),

  // Endpoints
  SharedLookupEndpoints: new Token<SharedLookupEndpoints>('SharedLookupEndpoints'),
  LocalizationEndpoints: new Token<LocalizationEndpoints>('LocalizationEndpoints'),
  ReferenceDataEndpoints: new Token<ReferenceDataEndpoints>('ReferenceDataEndpoints'),
};
