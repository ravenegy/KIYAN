import { IContainer, Lifetime } from '../../../core/di';
import { SalesModuleTokens } from './SalesModuleTokens';
import { SalesMappers } from '../application/mappers/SalesMappers';
import { SalesPersistenceMapper } from '../infrastructure/persistence/mappers/SalesPersistenceMapper';
import { Token } from '../../../core/di';

// Creating tokens on the fly if they don't exist in SalesModuleTokens
export const SalesMapperTokens = {
    SalesMappers: new Token<SalesMappers>('SalesMappers'),
    SalesPersistenceMapper: new Token<SalesPersistenceMapper>('SalesPersistenceMapper')
};

export class SalesMapperRegistration {
    public static register(container: IContainer): void {
        container.register(SalesMapperTokens.SalesMappers, () => {
            return new SalesMappers();
        }, Lifetime.Singleton);

        container.register(SalesMapperTokens.SalesPersistenceMapper, () => {
            return new SalesPersistenceMapper();
        }, Lifetime.Singleton);
    }
}
