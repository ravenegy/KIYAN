import { IContainer } from '../../../core/di';

export class MrpFactoryRegistration {
  public static register(container: IContainer): void {
    // Factories are managed by InfrastructureBootstrapper and resolved at Repository level
  }
}
