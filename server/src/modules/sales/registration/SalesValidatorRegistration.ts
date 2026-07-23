import { IContainer, Lifetime } from '../../../core/di';
import { SalesCommandValidators } from '../application/validators/SalesCommandValidators';
import { Token } from '../../../core/di';

export const SalesValidatorTokens = {
    SalesCommandValidators: new Token<SalesCommandValidators>('SalesCommandValidators')
};

export class SalesValidatorRegistration {
    public static register(container: IContainer): void {
        container.register(SalesValidatorTokens.SalesCommandValidators, () => {
            return new SalesCommandValidators();
        }, Lifetime.Singleton);
    }
}
