import { IContainer } from '../../../core/di';
import { IRouter } from '../presentation/contracts/IRouter';
import { SharedModuleTokens } from '../registration/SharedModuleTokens';
import { SharedLookupEndpoints } from '../presentation/endpoints/SharedLookupEndpoints';
import { LocalizationEndpoints } from '../presentation/endpoints/LocalizationEndpoints';
import { ReferenceDataEndpoints } from '../presentation/endpoints/ReferenceDataEndpoints';

export class SharedModuleRegistry {
  public static registerEndpoints(container: IContainer, router: IRouter): void {
    const sharedLookupController = container.resolve(SharedModuleTokens.SharedLookupController);
    SharedLookupEndpoints.register(router, sharedLookupController);

    const localizationController = container.resolve(SharedModuleTokens.LocalizationController);
    LocalizationEndpoints.register(router, localizationController);

    const referenceDataController = container.resolve(SharedModuleTokens.ReferenceDataController);
    ReferenceDataEndpoints.register(router, referenceDataController);
  }
}
