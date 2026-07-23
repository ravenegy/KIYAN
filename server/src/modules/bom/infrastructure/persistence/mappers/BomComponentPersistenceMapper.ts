import { BomComponent } from '../../../domain/entities/BomComponent';
import { BomComponentPersistenceModel } from '../models/BomComponentPersistenceModel';
import { BomComponentId } from '../../../domain/shared/BomComponentId';
import { BomId } from '../../../domain/shared/BomId';
import { ItemId } from '../../../domain/shared/ItemId';
import { Quantity } from '../../../domain/value-objects/Quantity';

export class BomComponentPersistenceMapper {
  public toPersistence(entity: BomComponent): BomComponentPersistenceModel {
    return {
      id: entity.id.value,
      bomId: entity.bomId.value,
      itemId: entity.itemId.value,
      quantity: entity.quantity.value,
      unitOfMeasure: entity.unitOfMeasure,
      scrapPercentage: entity.scrapPercentage,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version
    };
  }

  public toDomain(model: BomComponentPersistenceModel): BomComponent {
    const component = Object.create(BomComponent.prototype);
    
    Object.assign(component, {
      id: BomComponentId.create(model.id),
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      version: model.version,
      _bomId: BomId.create(model.bomId),
      _itemId: ItemId.create(model.itemId),
      _quantity: Quantity.create(model.quantity).value,
      _unitOfMeasure: model.unitOfMeasure,
      _scrapPercentage: model.scrapPercentage
    });
    
    return component;
  }
}
