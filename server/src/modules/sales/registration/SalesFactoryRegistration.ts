import { IContainer, Lifetime } from '../../../core/di';
import { SalesModuleTokens } from './SalesModuleTokens';
import { SalesRepositoryFactory } from '../infrastructure/factory/SalesRepositoryFactory';

export class SalesFactoryRegistration {
  public static register(container: IContainer): void {
    container.register(SalesModuleTokens.SalesRepositoryFactory, () => {
      return new SalesRepositoryFactory();
    }, Lifetime.Singleton);
  }
}
