import { IContainer } from '../../../core/di';
import { IRouter } from '../presentation/contracts/IRouter';
import { BomModuleTokens } from '../registration/BomModuleTokens';
import { BomEndpoints } from '../presentation/endpoints/BomEndpoints';

export class BomModuleRegistry {
  public static registerEndpoints(container: IContainer, router: IRouter): void {
    const controller = container.resolve(BomModuleTokens.BomController);
    const endpoints = new BomEndpoints(router, controller);
    endpoints.register();
  }
}
