import { ISupplierRepository } from '../../domain/repositories';
import { Supplier } from '../../domain/entities';
import { SupplierId } from '../../domain/shared';
import { PurchasingPersistenceMapper } from '../persistence/mappers';
import { SupplierPersistenceModel } from '../persistence/models';

export class SupplierRepository implements ISupplierRepository {
    private readonly store = new Map<string, SupplierPersistenceModel>();

    constructor(private readonly mapper: PurchasingPersistenceMapper) {}

    async findById(id: SupplierId): Promise<Supplier | null> {
        const model = this.store.get(id.value);
        if (!model) return null;
        return this.mapper.toSupplierDomain(model);
    }

    async save(supplier: Supplier): Promise<void> {
        const model = this.mapper.toSupplierPersistence(supplier);
        this.store.set(model.id, model);
    }

    async findAll(): Promise<readonly Supplier[]> {
        return Array.from(this.store.values()).map(m => this.mapper.toSupplierDomain(m));
    }
}
