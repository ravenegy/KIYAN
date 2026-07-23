import { IContainer, Lifetime } from '../../../core/di';
import { InventoryModuleTokens } from './InventoryModuleTokens';
import {
  CreateInventoryValidator,
  UpdateInventoryValidator,
  AdjustStockValidator,
  TransferStockValidator,
  ReceiveStockValidator,
  IssueStockValidator
} from '../application/validators/impl';

export class InventoryValidatorRegistration {
  public static register(container: IContainer): void {
    container.register(InventoryModuleTokens.CreateInventoryValidator, () => new CreateInventoryValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.UpdateInventoryValidator, () => new UpdateInventoryValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.AdjustStockValidator, () => new AdjustStockValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.TransferStockValidator, () => new TransferStockValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.ReceiveStockValidator, () => new ReceiveStockValidator(), Lifetime.Singleton);
    container.register(InventoryModuleTokens.IssueStockValidator, () => new IssueStockValidator(), Lifetime.Singleton);
  }
}
