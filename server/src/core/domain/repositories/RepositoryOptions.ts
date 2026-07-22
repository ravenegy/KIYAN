export interface RepositoryOptions {
  readonly tracking?: boolean;
  readonly includeSoftDeleted?: boolean;
  readonly includeRelations?: ReadonlyArray<string>;
  readonly timeout?: number;
  readonly caching?: boolean;
}
