import { IRouter } from './IRouter';
import { InventoryController } from '../controllers/InventoryController';

export class InventoryEndpoints {
  constructor(
    private readonly router: IRouter,
    private readonly controller: InventoryController
  ) {}

  public register(): void {
    this.router.get('/inventory', async (req, res) => {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const response = await this.controller.getItems(page, pageSize);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.get('/inventory/:id', async (req, res) => {
      const response = await this.controller.getItemById(req.params.id as string);
      res.status(response.success ? 200 : 404).json(response);
    });

    this.router.get('/inventory/sku/:sku', async (req, res) => {
      const response = await this.controller.getItemBySku(req.params.sku as string);
      res.status(response.success ? 200 : 404).json(response);
    });

    this.router.post('/inventory', async (req, res) => {
      const response = await this.controller.createItem(req.body as any);
      res.status(response.success ? 201 : 400).json(response);
    });

    this.router.put('/inventory/:id', async (req, res) => {
      const response = await this.controller.updateItem(req.params.id as string, req.body as any);
      res.status(response.success ? 200 : 400).json(response);
    });

    this.router.delete('/inventory/:id', async (req, res) => {
      const response = await this.controller.deleteItem(req.params.id as string);
      res.status(response.success ? 200 : 400).json(response);
    });
  }
}
