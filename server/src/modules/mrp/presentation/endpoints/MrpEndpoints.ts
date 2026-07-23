import { IRouter } from '../contracts/IRouter';
import { MrpController } from '../controllers/MrpController';

export class MrpEndpoints {
  constructor(
    private readonly router: IRouter,
    private readonly controller: MrpController
  ) {}

  public register(): void {
    this.router.get('/mrp-runs/:id', async (req: any, res: any) => {
      const response = await this.controller.getMrpRunById(req.params.id);
      res.status(response.success ? 200 : 404).json(response);
    });

    this.router.get('/mrp-runs/:id/requirements', async (req: any, res: any) => {
      const response = await this.controller.getMaterialRequirements(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/mrp-runs', async (req: any, res: any) => {
      const response = await this.controller.createMrpRun(req.body);
      res.status(response.success ? 201 : 400).json(response);
    });

    this.router.post('/mrp-runs/:id/start', async (req: any, res: any) => {
      const response = await this.controller.startMrpRun(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/mrp-runs/:id/complete', async (req: any, res: any) => {
      const response = await this.controller.completeMrpRun(req.params.id, req.body);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/mrp-runs/:id/cancel', async (req: any, res: any) => {
      const response = await this.controller.cancelMrpRun(req.params.id, req.body);
      res.status(response.success ? 200 : 400).json(response);
    });
  }
}
