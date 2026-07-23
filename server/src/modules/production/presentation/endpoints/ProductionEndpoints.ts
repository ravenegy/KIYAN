import { IRouter } from '../contracts/IRouter';
import { ProductionController } from '../controllers/ProductionController';

export class ProductionEndpoints {
    public static register(router: IRouter, controller: ProductionController): void {
        router.post('/api/production/orders', async (req: any, res: any) => {
            const response = await controller.createProductionOrder(req.body);
            res.status(response.success ? 201 : 400).json(response);
        });

        router.get('/api/production/orders/:id', async (req: any, res: any) => {
            const response = await controller.getProductionOrderById(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });

        router.get('/api/production/orders', async (req: any, res: any) => {
            const response = await controller.getProductionOrders(req.query);
            res.status(response.success ? 200 : 400).json(response);
        });

        router.post('/api/production/orders/:id/release', async (req: any, res: any) => {
            const response = await controller.releaseProductionOrder({ ...req.body, orderId: req.params.id });
            res.status(response.success ? 200 : 400).json(response);
        });

        router.post('/api/production/orders/:id/start', async (req: any, res: any) => {
            const response = await controller.startProductionOrder({ ...req.body, orderId: req.params.id });
            res.status(response.success ? 200 : 400).json(response);
        });

        router.post('/api/production/orders/:id/complete', async (req: any, res: any) => {
            const response = await controller.completeProductionOrder({ ...req.body, orderId: req.params.id });
            res.status(response.success ? 200 : 400).json(response);
        });

        router.post('/api/production/orders/:id/cancel', async (req: any, res: any) => {
            const response = await controller.cancelProductionOrder({ ...req.body, orderId: req.params.id });
            res.status(response.success ? 200 : 400).json(response);
        });

        router.post('/api/production/orders/:id/material-issues', async (req: any, res: any) => {
            const response = await controller.addMaterialIssue({ ...req.body, orderId: req.params.id });
            res.status(response.success ? 201 : 400).json(response);
        });

        router.post('/api/production/orders/:id/material-issues/:issueId/issue', async (req: any, res: any) => {
            const response = await controller.issueMaterial({ ...req.body, orderId: req.params.id, materialIssueId: req.params.issueId });
            res.status(response.success ? 200 : 400).json(response);
        });

        router.get('/api/production/orders/:id/material-issues', async (req: any, res: any) => {
            const response = await controller.getMaterialIssues(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });

        router.post('/api/production/orders/:id/receipts', async (req: any, res: any) => {
            const response = await controller.receiveFinishedGoods({ ...req.body, orderId: req.params.id });
            res.status(response.success ? 201 : 400).json(response);
        });

        router.get('/api/production/orders/:id/receipts', async (req: any, res: any) => {
            const response = await controller.getFinishedGoodReceipts(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });
    }
}
