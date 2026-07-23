import { IRouter, IRequest, IResponse } from './IRouter';
import { UsersController } from '../controllers/UsersController';
import { CreateUserRequest, UpdateUserRequest } from '../../application/dto';
import { ChangePasswordRequest, ChangeEmailRequest, AssignRoleRequest, GrantPermissionRequest } from '../models/requests';

export class UserEndpoints {
  public static register(router: IRouter, controller: UsersController): void {
    router.get('/users/:id', async (req: IRequest, res: IResponse) => {
      const response = await controller.getUserById(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.get('/users', async (req: IRequest, res: IResponse) => {
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
      const response = await controller.getUsers(page, pageSize);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.post('/users', async (req: IRequest, res: IResponse) => {
      const response = await controller.createUser(req.body as unknown as CreateUserRequest);
      res.status(response.success ? 201 : 400).json(response);
    });

    router.put('/users/:id', async (req: IRequest, res: IResponse) => {
      const body = req.body as Record<string, unknown>;
      const payload: UpdateUserRequest = { id: req.params.id, ...body } as unknown as UpdateUserRequest;
      const response = await controller.updateUser(payload);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.delete('/users/:id', async (req: IRequest, res: IResponse) => {
      const response = await controller.deleteUser(req.params.id);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.post('/users/:id/change-password', async (req: IRequest, res: IResponse) => {
      const response = await controller.changePassword(req.params.id, req.body as unknown as ChangePasswordRequest);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.post('/users/:id/change-email', async (req: IRequest, res: IResponse) => {
      const response = await controller.changeEmail(req.params.id, req.body as unknown as ChangeEmailRequest);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.post('/users/:id/roles', async (req: IRequest, res: IResponse) => {
      const body = req.body as Record<string, unknown>;
      const payload = { userId: req.params.id, ...body } as unknown as AssignRoleRequest & { userId: string };
      const response = await controller.assignRole(payload);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.post('/users/:id/permissions', async (req: IRequest, res: IResponse) => {
      const body = req.body as Record<string, unknown>;
      const payload = { userId: req.params.id, ...body } as unknown as GrantPermissionRequest & { userId: string };
      const response = await controller.grantPermission(payload);
      res.status(response.success ? 200 : 400).json(response);
    });
  }
}
