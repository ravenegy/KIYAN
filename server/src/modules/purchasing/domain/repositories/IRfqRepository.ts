import { RequestForQuotation } from '../entities';
import { RfqId } from '../shared';

export interface IRfqRepository {
    findById(id: RfqId): Promise<RequestForQuotation | null>;
    save(rfq: RequestForQuotation): Promise<void>;
    findAll(): Promise<readonly RequestForQuotation[]>;
}
