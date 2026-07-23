import { IRouter } from '../contracts/IRouter';
import { 
    PurchaseOrdersController,
    SuppliersController,
    RfqsController,
    QuotationsController
} from '../controllers';

export class PurchasingEndpoints {
    public static register(
        router: IRouter, 
        purchaseOrdersController: PurchaseOrdersController,
        suppliersController: SuppliersController,
        rfqsController: RfqsController,
        quotationsController: QuotationsController
    ): void {
        // Purchase Orders Endpoints

        // Required Permission: 'purchasing.orders.create'
        router.post('/api/purchasing/orders', async (req: any, res: any) => {
            const response = await purchaseOrdersController.createPurchaseOrder(req.body);
            res.status(response.success ? 201 : 400).json(response);
        });

        // Required Permission: 'purchasing.orders.read'
        router.get('/api/purchasing/orders/:id', async (req: any, res: any) => {
            const response = await purchaseOrdersController.getPurchaseOrderById(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.orders.read'
        router.get('/api/purchasing/orders', async (req: any, res: any) => {
            const response = await purchaseOrdersController.getPurchaseOrders(req.query);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.orders.update'
        router.post('/api/purchasing/orders/:id/lines', async (req: any, res: any) => {
            const response = await purchaseOrdersController.addPurchaseOrderLine(req.params.id, req.body);
            res.status(response.success ? 201 : 400).json(response);
        });

        // Required Permission: 'purchasing.orders.submit'
        router.post('/api/purchasing/orders/:id/submit', async (req: any, res: any) => {
            const response = await purchaseOrdersController.submitPurchaseOrder(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.orders.approve'
        router.post('/api/purchasing/orders/:id/approve', async (req: any, res: any) => {
            const response = await purchaseOrdersController.approvePurchaseOrder(req.params.id, req.body);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.orders.reject'
        router.post('/api/purchasing/orders/:id/reject', async (req: any, res: any) => {
            const response = await purchaseOrdersController.rejectPurchaseOrder(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.orders.cancel'
        router.post('/api/purchasing/orders/:id/cancel', async (req: any, res: any) => {
            const response = await purchaseOrdersController.cancelPurchaseOrder(req.params.id, req.body);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.orders.issue'
        router.post('/api/purchasing/orders/:id/issue', async (req: any, res: any) => {
            const response = await purchaseOrdersController.issuePurchaseOrder(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.orders.receive'
        router.post('/api/purchasing/orders/:id/receipts', async (req: any, res: any) => {
            const response = await purchaseOrdersController.receiveGoods(req.params.id, req.body);
            res.status(response.success ? 200 : 400).json(response);
        });


        // Suppliers Endpoints

        // Required Permission: 'purchasing.suppliers.create'
        router.post('/api/purchasing/suppliers', async (req: any, res: any) => {
            const response = await suppliersController.createSupplier(req.body);
            res.status(response.success ? 201 : 400).json(response);
        });

        // Required Permission: 'purchasing.suppliers.read'
        router.get('/api/purchasing/suppliers/:id', async (req: any, res: any) => {
            const response = await suppliersController.getSupplierById(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.suppliers.read'
        router.get('/api/purchasing/suppliers', async (req: any, res: any) => {
            const response = await suppliersController.getSuppliers(req.query);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.suppliers.qualify'
        router.post('/api/purchasing/suppliers/:id/qualify', async (req: any, res: any) => {
            const response = await suppliersController.qualifySupplier(req.params.id, req.body);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.suppliers.suspend'
        router.post('/api/purchasing/suppliers/:id/suspend', async (req: any, res: any) => {
            const response = await suppliersController.suspendSupplier(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });


        // RFQs Endpoints

        // Required Permission: 'purchasing.rfqs.create'
        router.post('/api/purchasing/rfqs', async (req: any, res: any) => {
            const response = await rfqsController.createRfq(req.body);
            res.status(response.success ? 201 : 400).json(response);
        });

        // Required Permission: 'purchasing.rfqs.read'
        router.get('/api/purchasing/rfqs/:id', async (req: any, res: any) => {
            const response = await rfqsController.getRfqById(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.rfqs.read'
        router.get('/api/purchasing/rfqs', async (req: any, res: any) => {
            const response = await rfqsController.getRfqs(req.query);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.rfqs.update'
        router.post('/api/purchasing/rfqs/:id/target-suppliers', async (req: any, res: any) => {
            const response = await rfqsController.addTargetSupplier(req.params.id, req.body);
            res.status(response.success ? 201 : 400).json(response);
        });

        // Required Permission: 'purchasing.rfqs.publish'
        router.post('/api/purchasing/rfqs/:id/publish', async (req: any, res: any) => {
            const response = await rfqsController.publishRfq(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });


        // Quotations Endpoints

        // Required Permission: 'purchasing.quotations.submit'
        router.post('/api/purchasing/quotations', async (req: any, res: any) => {
            const response = await quotationsController.submitQuotation(req.body);
            res.status(response.success ? 201 : 400).json(response);
        });

        // Required Permission: 'purchasing.quotations.accept'
        router.post('/api/purchasing/quotations/:id/accept', async (req: any, res: any) => {
            const response = await quotationsController.acceptQuotation(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });

        // Required Permission: 'purchasing.quotations.read'
        router.get('/api/purchasing/rfqs/:rfqId/quotations', async (req: any, res: any) => {
            const response = await quotationsController.getQuotationsByRfqId(req.params.rfqId);
            res.status(response.success ? 200 : 400).json(response);
        });
    }
}
