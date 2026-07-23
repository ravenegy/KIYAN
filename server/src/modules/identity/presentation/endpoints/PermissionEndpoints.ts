import { IRouter, IRequest, IResponse } from './IRouter';
import { PermissionsController } from '../controllers/PermissionsController';

export class PermissionEndpoints {
  public static register(router: IRouter, controller: PermissionsController): void {
    router.get('/permissions/:id', async (req: IRequest, res: IResponse) => {
      const response = await controller.getPermissionById(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.get('/permissions', async (req: IRequest, res: IResponse) => {
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
      const response = await controller.getPermissions(page, pageSize);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.post('/permissions', async (req: IRequest, res: IResponse) => {
      const response = await controller.createPermission(req.body as unknown as { name: string; code: string; description: string; effect: string });
      res.status(response.success ? 201 : 400).json(response);
    });

    router.put('/permissions/:id', async (req: IRequest, res: IResponse) => {
      const body = req.body as Record<string, unknown>;
      const payload = { id: req.params.id, ...body } as unknown as { id: string; name?: string; description?: string; effect?: string };
      const response = await controller.updatePermission(payload);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.delete('/permissions/:id', async (req: IRequest, res: IResponse) => {
      const response = await controller.deletePermission(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });
  }
}
