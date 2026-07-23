import { IRouter, IRequest, IResponse } from './IRouter';
import { AuthenticationController } from '../controllers/AuthenticationController';
import { LoginRequest, RegisterRequest, RefreshTokenRequest } from '../models/requests';

export class AuthenticationEndpoints {
  public static register(router: IRouter, controller: AuthenticationController): void {
    router.post('/auth/login', async (req: IRequest, res: IResponse) => {
      const response = await controller.login(req.body as unknown as LoginRequest);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.post('/auth/register', async (req: IRequest, res: IResponse) => {
      const response = await controller.register(req.body as unknown as RegisterRequest);
      res.status(response.success ? 200 : 400).json(response);
    });

    router.post('/auth/refresh-token', async (req: IRequest, res: IResponse) => {
      const response = await controller.refreshToken(req.body as unknown as RefreshTokenRequest);
      res.status(response.success ? 200 : 400).json(response);
    });
  }
}
