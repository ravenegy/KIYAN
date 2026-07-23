import { LookupDto } from '../dto/LookupDto';
// Note: In a real implementation this would map Domain Entities to DTOs
export class LookupMapper {
  public static toDto(entity: any): LookupDto {
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name,
      description: entity.description,
      items: entity.items || []
    };
  }
}
