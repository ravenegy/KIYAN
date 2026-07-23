import { IRouter } from '../contracts/IRouter';
import { PlannedOrderController } from '../controllers/PlannedOrderController';

export class PlannedOrderEndpoints {
  constructor(
    private readonly router: IRouter,
    private readonly controller: PlannedOrderController
  ) {}

  public register(): void {
    this.router.get('/planned-orders', async (req: any, res: any) => {
      // Allow searching via query parameters
      const response = await this.controller.searchPlannedOrders(req.query.itemId, req.query.status, req.query.type);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.get('/mrp-runs/:mrpRunId/planned-orders', async (req: any, res: any) => {
      const response = await this.controller.getPlannedOrdersByMrpRun(req.params.mrpRunId);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.get('/planned-orders/:id', async (req: any, res: any) => {
      const response = await this.controller.getPlannedOrderById(req.params.id);
      res.status(response.success ? 200 : 404).json(response);
    });

    this.router.post('/planned-orders', async (req: any, res: any) => {
      const response = await this.controller.createPlannedOrder(req.body);
      res.status(response.success ? 201 : 400).json(response);
    });

    this.router.post('/planned-orders/:id/firm', async (req: any, res: any) => {
      const response = await this.controller.firmPlannedOrder(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/planned-orders/:id/release', async (req: any, res: any) => {
      const response = await this.controller.releasePlannedOrder(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/planned-orders/:id/cancel', async (req: any, res: any) => {
      const response = await this.controller.cancelPlannedOrder(req.params.id, req.body);
      res.status(response.success ? 200 : 400).json(response);
    });
  }
}
