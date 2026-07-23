import { IContainer, Lifetime } from '../../../core/di';
import { BomModuleTokens } from './BomModuleTokens';
import { BomMapper } from '../application/mappers/impl/BomMapper';

export class BomMapperRegistration {
  public static register(container: IContainer): void {
    container.register(BomModuleTokens.IBomMapper, () => new BomMapper(), Lifetime.Singleton);
  }
}
