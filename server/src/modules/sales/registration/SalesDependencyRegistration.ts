import { IContainer } from '../../../core/di';
import { SalesFactoryRegistration } from './SalesFactoryRegistration';
import { SalesRepositoryRegistration } from './SalesRepositoryRegistration';
import { SalesHandlerRegistration } from './SalesHandlerRegistration';
import { SalesServiceRegistration } from './SalesServiceRegistration';
import { SalesMapperRegistration } from './SalesMapperRegistration';
import { SalesValidatorRegistration } from './SalesValidatorRegistration';

export class SalesDependencyRegistration {
    public static register(container: IContainer): void {
        SalesFactoryRegistration.register(container);
        SalesMapperRegistration.register(container);
        SalesValidatorRegistration.register(container);
        SalesRepositoryRegistration.register(container);
        SalesHandlerRegistration.register(container);
        SalesServiceRegistration.register(container);
    }
}
