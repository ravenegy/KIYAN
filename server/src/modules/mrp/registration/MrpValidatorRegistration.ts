import { IContainer, Lifetime } from '../../../core/di';
import { MrpModuleTokens } from './MrpModuleTokens';
import { CreateMrpRunValidator } from '../application/validators/CreateMrpRunValidator';

export class MrpValidatorRegistration {
  public static register(container: IContainer): void {
    container.register(MrpModuleTokens.IMrpValidator, () => new CreateMrpRunValidator(), Lifetime.Singleton);
  }
}
