import { IRouter } from '../contracts/IRouter';
import { ProductionOperationController } from '../controllers/ProductionOperationController';

export class ProductionOperationEndpoints {
    public static register(router: IRouter, controller: ProductionOperationController): void {
        router.post('/api/production/orders/:id/operations', async (req: any, res: any) => {
            const response = await controller.addOperation({ ...req.body, orderId: req.params.id });
            res.status(response.success ? 201 : 400).json(response);
        });

        router.post('/api/production/orders/:id/operations/:operationId/status', async (req: any, res: any) => {
            const response = await controller.updateOperationStatus({ ...req.body, orderId: req.params.id, operationId: req.params.operationId });
            res.status(response.success ? 200 : 400).json(response);
        });

        router.get('/api/production/orders/:id/operations', async (req: any, res: any) => {
            const response = await controller.getProductionOperations(req.params.id);
            res.status(response.success ? 200 : 400).json(response);
        });
    }
}
