import { 
    IPurchaseOrderRepository, 
    ISupplierRepository, 
    IRfqRepository, 
    IQuotationRepository 
} from '../../domain/repositories';
import { PurchasingPersistenceMapper } from '../persistence/mappers';
import { 
    PurchaseOrderRepository, 
    SupplierRepository, 
    RfqRepository, 
    QuotationRepository 
} from '../repositories';

export class PurchasingRepositoryFactory {
    private readonly mapper: PurchasingPersistenceMapper;
    
    private readonly purchaseOrderRepository: IPurchaseOrderRepository;
    private readonly supplierRepository: ISupplierRepository;
    private readonly rfqRepository: IRfqRepository;
    private readonly quotationRepository: IQuotationRepository;

    constructor() {
        this.mapper = new PurchasingPersistenceMapper();
        
        this.purchaseOrderRepository = new PurchaseOrderRepository(this.mapper);
        this.supplierRepository = new SupplierRepository(this.mapper);
        this.rfqRepository = new RfqRepository(this.mapper);
        this.quotationRepository = new QuotationRepository(this.mapper);
    }

    public getPurchaseOrderRepository(): IPurchaseOrderRepository {
        return this.purchaseOrderRepository;
    }

    public getSupplierRepository(): ISupplierRepository {
        return this.supplierRepository;
    }

    public getRfqRepository(): IRfqRepository {
        return this.rfqRepository;
    }

    public getQuotationRepository(): IQuotationRepository {
        return this.quotationRepository;
    }
}
