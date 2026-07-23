import { BomDto } from '../dto/BomDto';
import { BomSummaryDto } from '../dto/BomSummaryDto';
import { Result } from '../../../../core/results/Result';

export interface IBomApplicationService {
  createBom(name: string, targetItemId: string): Promise<Result<string>>;
  addBomComponent(bomId: string, itemId: string, quantity: number, unitOfMeasure: string, scrapPercentage?: number): Promise<Result<void>>;
  removeBomComponent(bomId: string, itemId: string): Promise<Result<void>>;
  activateBom(bomId: string): Promise<Result<void>>;
  archiveBom(bomId: string): Promise<Result<void>>;
  
  getBomById(bomId: string): Promise<Result<BomDto>>;
  getActiveBomForTarget(targetItemId: string): Promise<Result<BomDto>>;
  getBomsForTarget(targetItemId: string): Promise<Result<BomSummaryDto[]>>;
}
