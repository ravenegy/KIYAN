import { IContainer, Lifetime } from '../../../core/di';
import { BomModuleTokens } from './BomModuleTokens';
import { BomValidator } from '../application/validators/impl/BomValidator';

export class BomValidatorRegistration {
  public static register(container: IContainer): void {
    container.register(BomModuleTokens.IBomValidator, () => new BomValidator(), Lifetime.Singleton);
  }
}
