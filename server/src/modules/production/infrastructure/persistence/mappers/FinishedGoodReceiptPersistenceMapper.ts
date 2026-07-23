import { FinishedGoodReceipt } from '../../../domain/entities/FinishedGoodReceipt';
import { FinishedGoodReceiptId } from '../../../domain/shared/FinishedGoodReceiptId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { ReceiptStatus } from '../../../domain/enums/ReceiptStatus';
import { FinishedGoodReceiptPersistenceModel } from '../models/FinishedGoodReceiptPersistenceModel';

export class FinishedGoodReceiptPersistenceMapper {
  public toDomain(model: FinishedGoodReceiptPersistenceModel): FinishedGoodReceipt {
    const receipt = Object.create(FinishedGoodReceipt.prototype) as FinishedGoodReceipt;
    
    receipt.load(
      model.itemId,
      Quantity.create(model.quantity).value!,
      model.status as ReceiptStatus
    );
    
    Object.defineProperty(receipt, 'id', { value: FinishedGoodReceiptId.create(model.id).value!, writable: false });
    Object.defineProperty(receipt, 'createdAt', { value: model.createdAt, writable: false });
    Object.defineProperty(receipt, 'updatedAt', { value: model.updatedAt, writable: true });
    Object.defineProperty(receipt, 'version', { value: model.version, writable: true });
    
    receipt.clearDomainEvents();
    return receipt;
  }

  public toPersistence(entity: FinishedGoodReceipt, productionOrderId: string): FinishedGoodReceiptPersistenceModel {
    return {
      id: entity.id.value,
      productionOrderId,
      itemId: entity.itemId,
      quantity: entity.quantity.amount,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version
    };
  }
}