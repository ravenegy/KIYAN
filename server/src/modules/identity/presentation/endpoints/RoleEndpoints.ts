import { IRouter, IRequest, IResponse } from './IRouter';
import { RolesController } from '../controllers/RolesController';

export class RoleEndpoints {
  public static register(router: IRouter, controller: RolesController): void {
    router.get('/roles/:id', async (req: IRequest, res: IResponse) => {
      const response = await controller.getRoleById(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.get('/roles', async (req: IRequest, res: IResponse) => {
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
      const response = await controller.getRoles(page, pageSize);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.post('/roles', async (req: IRequest, res: IResponse) => {
      const response = await controller.createRole(req.body as unknown as { name: string; description: string });
      res.status(response.success ? 201 : 400).json(response);
    });

    router.put('/roles/:id', async (req: IRequest, res: IResponse) => {
      const body = req.body as Record<string, unknown>;
      const payload = { id: req.params.id, ...body } as unknown as { id: string; name?: string; description?: string };
      const response = await controller.updateRole(payload);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.delete('/roles/:id', async (req: IRequest, res: IResponse) => {
      const response = await controller.deleteRole(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });
  }
}
