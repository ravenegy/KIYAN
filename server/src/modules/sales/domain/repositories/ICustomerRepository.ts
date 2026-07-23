import { Customer } from '../aggregates/Customer';
import { CustomerId } from '../value-objects/Identifiers';

export interface ICustomerRepository {
    findById(id: CustomerId): Promise<Customer | null>;
    save(customer: Customer): Promise<void>;
}
