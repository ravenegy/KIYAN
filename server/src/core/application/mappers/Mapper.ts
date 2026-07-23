export interface IMapper<TDomain, TPersistence, TDto> {
  toDomain(raw: TPersistence): TDomain;
  toPersistence(domain: TDomain): TPersistence;
  toDto(domain: TDomain): TDto;
}

export abstract class BaseMapper<TDomain, TPersistence, TDto> implements IMapper<TDomain, TPersistence, TDto> {
  abstract toDomain(raw: TPersistence): TDomain;
  abstract toPersistence(domain: TDomain): TPersistence;
  abstract toDto(domain: TDomain): TDto;
}
