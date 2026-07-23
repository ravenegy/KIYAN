import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { Customer } from '../../domain/aggregates/Customer';
import { CustomerId } from '../../domain/value-objects';
import { SalesPersistenceMapper } from '../persistence/mappers/SalesPersistenceMapper';
import { CustomerPersistenceModel } from '../persistence/models';

export class CustomerRepository implements ICustomerRepository {
    private readonly store = new Map<string, CustomerPersistenceModel>();

    constructor(private readonly mapper: SalesPersistenceMapper) {}

    async findById(id: CustomerId): Promise<Customer | null> {
        const model = this.store.get(id.value);
        if (!model) return null;
        return this.mapper.toCustomerDomain(model);
    }

    async save(customer: Customer): Promise<void> {
        const model = this.mapper.toCustomerPersistence(customer);
        this.store.set(model.id, model);
    }

    async findAll(): Promise<readonly Customer[]> {
        return Array.from(this.store.values()).map(model => this.mapper.toCustomerDomain(model));
    }
}
