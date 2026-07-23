import { IRouter } from './IRouter';
import { StockController } from '../controllers/StockController';

export class StockEndpoints {
  constructor(
    private readonly router: IRouter,
    private readonly controller: StockController
  ) {}

  public register(): void {
    this.router.get('/inventory/:id/stock', async (req, res) => {
      const response = await this.controller.getStockLevels(req.params.id as string);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/inventory/:id/adjust', async (req, res) => {
      const response = await this.controller.adjustStock(req.params.id as string, req.body as any);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/inventory/:id/receive', async (req, res) => {
      const response = await this.controller.receiveStock(req.params.id as string, req.body as any);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/inventory/:id/issue', async (req, res) => {
      const response = await this.controller.issueStock(req.params.id as string, req.body as any);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.post('/inventory/:id/transfer', async (req, res) => {
      const response = await this.controller.transferStock(req.params.id as string, req.body as any);
      res.status(response.success ? 200 : 400).json(response);
    });
  }
}
