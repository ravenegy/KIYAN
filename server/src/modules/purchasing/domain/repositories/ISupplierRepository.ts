import { Supplier } from '../entities';
import { SupplierId } from '../shared';

export interface ISupplierRepository {
    findById(id: SupplierId): Promise<Supplier | null>;
    save(supplier: Supplier): Promise<void>;
    findAll(): Promise<readonly Supplier[]>;
}
