const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/bom/presentation');
function write(subpath, content) {
    const dir = path.dirname(path.join(modDir, subpath));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

// 1. Contracts
write('contracts/IRouter.ts', `export interface IRouter {
  get(path: string, handler: Function): void;
  post(path: string, handler: Function): void;
  put(path: string, handler: Function): void;
  delete(path: string, handler: Function): void;
}`);
write('contracts/index.ts', `export * from './IRouter';`);

// 2. Models (Requests)
write('models/requests/CreateBomRequest.ts', `export interface CreateBomRequest {
  readonly name: string;
  readonly targetItemId: string;
}`);
write('models/requests/AddBomComponentRequest.ts', `export interface AddBomComponentRequest {
  readonly itemId: string;
  readonly quantity: number;
  readonly unitOfMeasure: string;
  readonly scrapPercentage?: number;
}`);
write('models/requests/index.ts', `export * from './CreateBomRequest';\nexport * from './AddBomComponentRequest';`);

// 3. Models (Responses)
write('models/responses/ApiResponse.ts', `export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly errors?: readonly string[];
  readonly timestamp: string;
}

export class ApiResponseBuilder {
  public static success<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  public static error<T>(error: string, errors?: readonly string[]): ApiResponse<T> {
    return {
      success: false,
      error,
      errors,
      timestamp: new Date().toISOString(),
    };
  }
}`);
write('models/responses/BomComponentResponse.ts', `export interface BomComponentResponse {
  readonly id: string;
  readonly bomId: string;
  readonly itemId: string;
  readonly quantity: number;
  readonly unitOfMeasure: string;
  readonly scrapPercentage: number;
}`);
write('models/responses/BomResponse.ts', `import { BomComponentResponse } from './BomComponentResponse';

export interface BomResponse {
  readonly id: string;
  readonly name: string;
  readonly targetItemId: string;
  readonly status: string;
  readonly version: number;
  readonly components: readonly BomComponentResponse[];
  readonly createdAt: string;
  readonly updatedAt?: string;
}`);
write('models/responses/BomSummaryResponse.ts', `export interface BomSummaryResponse {
  readonly id: string;
  readonly name: string;
  readonly targetItemId: string;
  readonly status: string;
  readonly version: number;
  readonly createdAt: string;
}`);
write('models/responses/index.ts', `export * from './ApiResponse';\nexport * from './BomComponentResponse';\nexport * from './BomResponse';\nexport * from './BomSummaryResponse';`);

// 4. Models Index
write('models/index.ts', `export * from './requests';\nexport * from './responses';`);

// 5. Controllers
write('controllers/BomController.ts', `import { IBomApplicationService } from '../../application/services/IBomApplicationService';
import { CreateBomRequest } from '../models/requests/CreateBomRequest';
import { AddBomComponentRequest } from '../models/requests/AddBomComponentRequest';
import { ApiResponse, ApiResponseBuilder } from '../models/responses/ApiResponse';
import { BomResponse } from '../models/responses/BomResponse';
import { BomSummaryResponse } from '../models/responses/BomSummaryResponse';

export class BomController {
  constructor(private readonly bomService: IBomApplicationService) {}

  public async getBomById(id: string): Promise<ApiResponse<BomResponse>> {
    const result = await this.bomService.getBomById(id);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(result.value! as unknown as BomResponse);
  }

  public async getActiveBomForTarget(targetItemId: string): Promise<ApiResponse<BomResponse>> {
    const result = await this.bomService.getActiveBomForTarget(targetItemId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(result.value! as unknown as BomResponse);
  }

  public async getBomsForTarget(targetItemId: string): Promise<ApiResponse<ReadonlyArray<BomSummaryResponse>>> {
    const result = await this.bomService.getBomsForTarget(targetItemId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(result.value! as unknown as ReadonlyArray<BomSummaryResponse>);
  }

  public async createBom(request: CreateBomRequest): Promise<ApiResponse<string>> {
    const result = await this.bomService.createBom(request.name, request.targetItemId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(result.value!);
  }

  public async addBomComponent(bomId: string, request: AddBomComponentRequest): Promise<ApiResponse<void>> {
    const result = await this.bomService.addBomComponent(
      bomId,
      request.itemId,
      request.quantity,
      request.unitOfMeasure,
      request.scrapPercentage
    );
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(undefined as void);
  }

  public async removeBomComponent(bomId: string, itemId: string): Promise<ApiResponse<void>> {
    const result = await this.bomService.removeBomComponent(bomId, itemId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(undefined as void);
  }

  public async activateBom(bomId: string): Promise<ApiResponse<void>> {
    const result = await this.bomService.activateBom(bomId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(undefined as void);
  }

  public async archiveBom(bomId: string): Promise<ApiResponse<void>> {
    const result = await this.bomService.archiveBom(bomId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(undefined as void);
  }
}`);
write('controllers/index.ts', `export * from './BomController';`);

// 6. Endpoints
write('endpoints/BomEndpoints.ts', `import { IRouter } from '../contracts/IRouter';
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
}`);
write('endpoints/index.ts', `export * from './BomEndpoints';`);

// 7. Root Index
write('index.ts', `export * from './contracts';
export * from './models';
export * from './controllers';
export * from './endpoints';`);

console.log('BOM Presentation layer created successfully.');
