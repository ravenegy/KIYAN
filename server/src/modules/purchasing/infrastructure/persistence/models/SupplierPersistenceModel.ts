import { SupplierStatus } from '../../../domain/enums';

export interface SupplierPersistenceModel {
    id: string;
    name: string;
    contactEmail: string;
    status: SupplierStatus;
    qualificationLevel: string;
    rating: number;
}
