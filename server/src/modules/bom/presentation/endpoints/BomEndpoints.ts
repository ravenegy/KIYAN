import { IRouter } from '../contracts/IRouter';
import { BomController } from '../controllers/BomController';

export class BomEndpoints {
  constructor(
    private readonly router: IRouter,
    private readonly controller: BomController
  ) {}

  public register(): void {
    this.router.get('/boms/:id', async (req: any, res: any) => {
      const response = await this.controller.getBomById(req.params.id);
      res.status(response.success ? 200 : 404).json(response);
    });

    this.router.get('/boms/target/:targetItemId/active', async (req: any, res: any) => {
      const response = await this.controller.getActiveBomForTarget(req.params.targetItemId);
      res.status(response.success ? 200 : 404).json(response);
    });

    this.router.get('/boms/target/:targetItemId', async (req: any, res: any) => {
      const response = await this.controller.getBomsForTarget(req.params.targetItemId);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/boms', async (req: any, res: any) => {
      const response = await this.controller.createBom(req.body);
      res.status(response.success ? 201 : 400).json(response);
    });

    this.router.post('/boms/:id/components', async (req: any, res: any) => {
      const response = await this.controller.addBomComponent(req.params.id, req.body);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.delete('/boms/:id/components/:itemId', async (req: any, res: any) => {
      const response = await this.controller.removeBomComponent(req.params.id, req.params.itemId);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/boms/:id/activate', async (req: any, res: any) => {
      const response = await this.controller.activateBom(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/boms/:id/archive', async (req: any, res: any) => {
      const response = await this.controller.archiveBom(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });
  }
}
