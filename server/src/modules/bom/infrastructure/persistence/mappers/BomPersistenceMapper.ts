import { BillOfMaterial } from '../../../domain/entities/BillOfMaterial';
import { BomPersistenceModel } from '../models/BomPersistenceModel';
import { BomComponentPersistenceMapper } from './BomComponentPersistenceMapper';
import { BomId } from '../../../domain/shared/BomId';
import { ItemId } from '../../../domain/shared/ItemId';
import { Version } from '../../../domain/value-objects/Version';
import { BomStatus } from '../../../domain/enums/BomStatus';
import { BomComponent } from '../../../domain/entities/BomComponent';

export class BomPersistenceMapper {
  constructor(private readonly componentMapper: BomComponentPersistenceMapper) {}

  public toPersistence(entity: BillOfMaterial): BomPersistenceModel {
    return {
      id: entity.id.value,
      name: entity.name,
      targetItemId: entity.targetItemId.value,
      status: entity.status,
      version: entity.bomVersion.value,
      components: entity.components.map(c => this.componentMapper.toPersistence(c)),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      aggregateVersion: entity.version
    };
  }

  public toDomain(model: BomPersistenceModel): BillOfMaterial {
    const bom = Object.create(BillOfMaterial.prototype);
    
    const componentsMap = new Map<string, BomComponent>();
    for (const compModel of model.components) {
      const comp = this.componentMapper.toDomain(compModel);
      componentsMap.set(comp.itemId.value, comp);
    }
    
    Object.assign(bom, {
      id: BomId.create(model.id),
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      version: model.aggregateVersion,
      _domainEvents: [],
      _name: model.name,
      _targetItemId: ItemId.create(model.targetItemId),
      _status: model.status as BomStatus,
      _version: Version.create(model.version).value,
      _components: componentsMap
    });
    
    return bom;
  }
}
