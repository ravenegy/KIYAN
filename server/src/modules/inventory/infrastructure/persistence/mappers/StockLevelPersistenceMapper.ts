import { StockLevelPersistenceModel } from '../models/StockLevelPersistenceModel';
import { StockLevel } from '../../../domain/entities/StockLevel';
import { StockLevelId } from '../../../domain/shared/StockLevelId';
import { StockLocationId } from '../../../domain/shared/StockLocationId';
import { LotId } from '../../../domain/shared/LotId';
import { Quantity } from '../../../domain/value-objects/Quantity';

export class StockLevelPersistenceMapper {
  public toPersistence(entity: StockLevel): StockLevelPersistenceModel {
    return {
      id: entity.id.value,
      locationId: entity.locationId.value,
      quantity: entity.quantity.value,
      lotId: entity.lotId ? entity.lotId.value : null
    };
  }

  public toDomain(model: StockLevelPersistenceModel): StockLevel {
    const id = StockLevelId.create(model.id).value!;
    const locationId = StockLocationId.create(model.locationId).value!;
    const quantity = Quantity.create(model.quantity).value!;
    const lotId = model.lotId ? LotId.create(model.lotId).value : undefined;

    return new StockLevel(id, locationId, quantity, lotId);
  }
}
