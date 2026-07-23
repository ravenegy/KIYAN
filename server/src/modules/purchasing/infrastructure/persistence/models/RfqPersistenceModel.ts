import { RfqStatus } from '../../../domain/enums';

export interface RfqPersistenceModel {
    id: string;
    itemId: string;
    requiredQuantity: number;
    requiredByDate: Date;
    status: RfqStatus;
    targetSuppliers: string[];
}
