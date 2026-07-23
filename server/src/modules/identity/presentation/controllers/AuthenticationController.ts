import { IAuthenticationApplicationService } from '../../application/interfaces/IAuthenticationApplicationService';
import { LoginRequest, RegisterRequest, RefreshTokenRequest } from '../models/requests';
import { AuthenticationResponse, ApiResponse } from '../models/responses';
import { Result } from '../../../../core';

export class AuthenticationController {
  constructor(private readonly authService: IAuthenticationApplicationService) {}

  async login(request: LoginRequest): Promise<ApiResponse<AuthenticationResponse>> {
    // Assuming authService has login method
    const result = await (this.authService as any).login(request);
    return this.mapToResponse(result);
  }

  async register(request: RegisterRequest): Promise<ApiResponse<void>> {
    const result = await (this.authService as any).register(request);
    return this.mapToResponse(result);
  }

  async refreshToken(request: RefreshTokenRequest): Promise<ApiResponse<AuthenticationResponse>> {
    const result = await (this.authService as any).refreshToken(request);
    return this.mapToResponse(result);
  }

  private mapToResponse<T>(result: Result<T>): ApiResponse<T> {
    if (result.isSuccess) {
      return { success: true, data: result.value };
    }
    return {
      success: false,
      error: {
        code: result.error?.code || 'UNKNOWN_ERROR',
        message: result.error?.message || 'An unknown error occurred',
        details: result.errors?.map(e => e.message)
      }
    };
  }
}

