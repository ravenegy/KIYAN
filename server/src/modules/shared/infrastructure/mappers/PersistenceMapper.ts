export interface PersistenceMapper<TDomain, TModel> {
  toDomain(model: TModel): TDomain;
  toModel(domain: TDomain): TModel;
}
