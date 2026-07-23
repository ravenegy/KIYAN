import { IContainer, Lifetime } from '../../../core/di';
import { SharedModuleTokens } from './SharedModuleTokens';

// Application
import { SharedLookupService, LocalizationApplicationService, ReferenceDataService } from '../application/services';
import { CreateLookupValidator, UpdateLookupValidator } from '../application/validators';
import { CreateLookupCommandHandler, UpdateLookupCommandHandler, DeleteLookupCommandHandler, GetLookupByIdQueryHandler, GetLookupsQueryHandler, SearchLookupsQueryHandler } from '../application/handlers';

// Infrastructure (Mappers)
import { LookupPersistenceMapper } from '../infrastructure/mappers';

// Presentation
import { SharedLookupController, LocalizationController, ReferenceDataController } from '../presentation/controllers';
import { SharedLookupEndpoints, LocalizationEndpoints, ReferenceDataEndpoints } from '../presentation/endpoints';

export class SharedDependencyRegistration {
  public static register(container: IContainer): void {
    // Application Services
    container.register(SharedModuleTokens.ISharedLookupService, () => new SharedLookupService(), Lifetime.Scoped);
    container.register(SharedModuleTokens.ILocalizationApplicationService, () => new LocalizationApplicationService(), Lifetime.Scoped);
    container.register(SharedModuleTokens.IReferenceDataService, () => new ReferenceDataService(), Lifetime.Scoped);

    // Mappers
    container.register(SharedModuleTokens.LookupPersistenceMapper, () => new LookupPersistenceMapper(), Lifetime.Singleton);

    // Handlers
    container.register(SharedModuleTokens.CreateLookupCommandHandler, () => new CreateLookupCommandHandler(), Lifetime.Scoped);
    container.register(SharedModuleTokens.UpdateLookupCommandHandler, () => new UpdateLookupCommandHandler(), Lifetime.Scoped);
    container.register(SharedModuleTokens.DeleteLookupCommandHandler, () => new DeleteLookupCommandHandler(), Lifetime.Scoped);
    container.register(SharedModuleTokens.GetLookupByIdQueryHandler, () => new GetLookupByIdQueryHandler(), Lifetime.Scoped);
    container.register(SharedModuleTokens.GetLookupsQueryHandler, () => new GetLookupsQueryHandler(), Lifetime.Scoped);
    container.register(SharedModuleTokens.SearchLookupsQueryHandler, () => new SearchLookupsQueryHandler(), Lifetime.Scoped);

    // Validators
    container.register(SharedModuleTokens.CreateLookupValidator, () => new CreateLookupValidator(), Lifetime.Singleton);
    container.register(SharedModuleTokens.UpdateLookupValidator, () => new UpdateLookupValidator(), Lifetime.Singleton);

    // Controllers
    container.register(
      SharedModuleTokens.SharedLookupController,
      (c) => new SharedLookupController(c.resolve(SharedModuleTokens.ISharedLookupService)),
      Lifetime.Scoped
    );
    container.register(
      SharedModuleTokens.LocalizationController,
      (c) => new LocalizationController(c.resolve(SharedModuleTokens.ILocalizationApplicationService)),
      Lifetime.Scoped
    );
    container.register(
      SharedModuleTokens.ReferenceDataController,
      (c) => new ReferenceDataController(c.resolve(SharedModuleTokens.IReferenceDataService)),
      Lifetime.Scoped
    );

    // Endpoints (typically singletons as they just register routes)
    container.register(SharedModuleTokens.SharedLookupEndpoints, () => new SharedLookupEndpoints(), Lifetime.Singleton);
    container.register(SharedModuleTokens.LocalizationEndpoints, () => new LocalizationEndpoints(), Lifetime.Singleton);
    container.register(SharedModuleTokens.ReferenceDataEndpoints, () => new ReferenceDataEndpoints(), Lifetime.Singleton);
  }
}
