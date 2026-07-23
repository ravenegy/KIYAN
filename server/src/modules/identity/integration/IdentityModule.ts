import { IContainer } from '../../../core';
import { IdentityModuleBuilder } from './IdentityModuleBuilder';

export class IdentityModule {
  public static register(container: IContainer, configFn?: (builder: IdentityModuleBuilder) => void): void {
    const builder = new IdentityModuleBuilder(container);
    if (configFn) {
      configFn(builder);
    }
    builder.build();
  }
}
