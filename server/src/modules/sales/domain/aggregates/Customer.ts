import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { CustomerId } from '../value-objects';
import { CustomerCreatedEvent, CustomerSuspendedEvent } from '../events';

export enum CustomerStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED'
}

export class Customer extends AggregateRoot<CustomerId> {
    private _name: string;
    private _email: string;
    private _status: CustomerStatus;

    private constructor(id: CustomerId, name: string, email: string) {
        super(id);
        this._name = name;
        this._email = email;
        this._status = CustomerStatus.ACTIVE;
    }

    public static create(id: CustomerId, name: string, email: string): Customer {
        const customer = new Customer(id, name, email);
        customer.addDomainEvent(new CustomerCreatedEvent(id, name));
        return customer;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public get status(): CustomerStatus {
        return this._status;
    }

    public updateDetails(name: string, email: string): void {
        this._name = name;
        this._email = email;
    }

    public suspend(): void {
        if (this._status === CustomerStatus.SUSPENDED) {
            return;
        }
        this._status = CustomerStatus.SUSPENDED;
        this.addDomainEvent(new CustomerSuspendedEvent(this.id));
    }

    public reactivate(): void {
        this._status = CustomerStatus.ACTIVE;
    }

    public get isEligibleForOrders(): boolean {
        return this._status === CustomerStatus.ACTIVE;
    }
}
