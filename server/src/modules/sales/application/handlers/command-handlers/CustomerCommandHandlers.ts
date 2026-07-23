import { Result } from '../../../../../core/results/Result';
import { ICustomerRepository } from '../../../domain/repositories/ICustomerRepository';
import { Customer } from '../../../domain/aggregates/Customer';
import { CustomerId } from '../../../domain/value-objects/Identifiers';
import { 
    CreateCustomerCommand, 
    UpdateCustomerCommand, 
    SuspendCustomerCommand, 
    ReactivateCustomerCommand 
} from '../../commands/SalesCommands';

export class CreateCustomerCommandHandler {
    constructor(private readonly customerRepository: ICustomerRepository) {}

    async handle(command: CreateCustomerCommand): Promise<Result<string>> {
        try {
            const customerId = CustomerId.create();
            const customer = Customer.create(customerId, command.name, command.email);
            await this.customerRepository.save(customer);
            return Result.success(customer.id.value);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class UpdateCustomerCommandHandler {
    constructor(private readonly customerRepository: ICustomerRepository) {}

    async handle(command: UpdateCustomerCommand): Promise<Result<void>> {
        try {
            const customer = await this.customerRepository.findById(CustomerId.create(command.customerId));
            if (!customer) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Customer not found' });
            }
            customer.updateDetails(command.name, command.email);
            await this.customerRepository.save(customer);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class SuspendCustomerCommandHandler {
    constructor(private readonly customerRepository: ICustomerRepository) {}

    async handle(command: SuspendCustomerCommand): Promise<Result<void>> {
        try {
            const customer = await this.customerRepository.findById(CustomerId.create(command.customerId));
            if (!customer) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Customer not found' });
            }
            customer.suspend();
            await this.customerRepository.save(customer);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class ReactivateCustomerCommandHandler {
    constructor(private readonly customerRepository: ICustomerRepository) {}

    async handle(command: ReactivateCustomerCommand): Promise<Result<void>> {
        try {
            const customer = await this.customerRepository.findById(CustomerId.create(command.customerId));
            if (!customer) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Customer not found' });
            }
            customer.reactivate();
            await this.customerRepository.save(customer);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}
