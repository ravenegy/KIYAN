import { IContainer, Lifetime, Token } from '../../../../core/di';
import { InventoryModuleConfiguration } from '../../module/InventoryModuleConfiguration';
import { StockLevelPersistenceMapper } from '../persistence/mappers/StockLevelPersistenceMapper';
import { InventoryPersistenceMapper } from '../persistence/mappers/InventoryPersistenceMapper';
import { InventoryRepositoryFactory } from '../factories/InventoryRepositoryFactory';
import { InventoryInfrastructureFactory } from '../factories/InventoryInfrastructureFactory';
import { InventoryItemRepository } from '../repositories/InventoryItemRepository';
import { InventoryInfrastructureService } from '../services/InventoryInfrastructureService';
import { IInventoryItemRepository } from '../../domain/repositories/IInventoryItemRepository';

export const InventoryInfrastructureTokens = {
  Configuration: new Token<InventoryModuleConfiguration>('InventoryModuleConfiguration'),
  StockLevelPersistenceMapper: new Token<StockLevelPersistenceMapper>('StockLevelPersistenceMapper'),
  InventoryPersistenceMapper: new Token<InventoryPersistenceMapper>('InventoryPersistenceMapper'),
  InventoryRepositoryFactory: new Token<InventoryRepositoryFactory>('InventoryRepositoryFactory'),
  InventoryInfrastructureFactory: new Token<InventoryInfrastructureFactory>('InventoryInfrastructureFactory'),
  IInventoryItemRepository: new Token<IInventoryItemRepository>('IInventoryItemRepository'),
  InventoryInfrastructureService: new Token<InventoryInfrastructureService>('InventoryInfrastructureService'),
};

export class InventoryInfrastructureBootstrapper {
  public static bootstrap(container: IContainer, config: InventoryModuleConfiguration): void {
    // Config
    container.register(InventoryInfrastructureTokens.Configuration, () => config, Lifetime.Singleton);

    // Mappers
    container.register(InventoryInfrastructureTokens.StockLevelPersistenceMapper, () => new StockLevelPersistenceMapper(), Lifetime.Singleton);
    container.register(InventoryInfrastructureTokens.InventoryPersistenceMapper, (c) => {
      const stockLevelMapper = c.resolve(InventoryInfrastructureTokens.StockLevelPersistenceMapper);
      return new InventoryPersistenceMapper(stockLevelMapper);
    }, Lifetime.Singleton);

    // Factories
    container.register(InventoryInfrastructureTokens.InventoryRepositoryFactory, (c) => {
      const mapper = c.resolve(InventoryInfrastructureTokens.InventoryPersistenceMapper);
      return new InventoryRepositoryFactory(mapper);
    }, Lifetime.Singleton);

    container.register(InventoryInfrastructureTokens.InventoryInfrastructureFactory, () => {
      return new InventoryInfrastructureFactory();
    }, Lifetime.Singleton);

    // Repositories
    container.register(InventoryInfrastructureTokens.IInventoryItemRepository, (c) => {
      const factory = c.resolve(InventoryInfrastructureTokens.InventoryRepositoryFactory);
      return factory.createInventoryItemRepository();
    }, Lifetime.Scoped);

    // Services
    container.register(InventoryInfrastructureTokens.InventoryInfrastructureService, (c) => {
      const factory = c.resolve(InventoryInfrastructureTokens.InventoryInfrastructureFactory);
      return factory.createService();
    }, Lifetime.Scoped);
  }
}
