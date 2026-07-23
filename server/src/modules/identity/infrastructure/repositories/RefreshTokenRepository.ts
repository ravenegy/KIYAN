import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';
import { RefreshToken } from '../../domain/entities/RefreshToken';
import { RefreshTokenId } from '../../domain/value-objects/RefreshTokenId';
import { UserId } from '../../domain/value-objects/UserId';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private tokens: Map<string, RefreshToken> = new Map();

  async getById(id: RefreshTokenId, options?: RepositoryOptions): Promise<RefreshToken | null> {
    return this.tokens.get(id.value) || null;
  }

  async exists(id: RefreshTokenId, options?: RepositoryOptions): Promise<boolean> {
    return this.tokens.has(id.value);
  }

  async count(query?: RepositoryQuery<RefreshToken>, options?: RepositoryOptions): Promise<number> {
    return this.tokens.size;
  }

  async find(query?: RepositoryQuery<RefreshToken>, options?: RepositoryOptions): Promise<PagedResult<RefreshToken>> {
    const items = Array.from(this.tokens.values());
    return new PagedResult<RefreshToken>(items, items.length, 1, items.length);
  }

  async findOne(query?: RepositoryQuery<RefreshToken>, options?: RepositoryOptions): Promise<RefreshToken | null> {
    return Array.from(this.tokens.values())[0] || null;
  }

  async add(entity: RefreshToken, options?: RepositoryOptions): Promise<void> {
    this.tokens.set(entity.id.value, entity);
  }

  async update(entity: RefreshToken, options?: RepositoryOptions): Promise<void> {
    this.tokens.set(entity.id.value, entity);
  }

  async delete(entity: RefreshToken, options?: RepositoryOptions): Promise<void> {
    this.tokens.delete(entity.id.value);
  }

  async softDelete(entity: RefreshToken, options?: RepositoryOptions): Promise<void> {
    this.tokens.delete(entity.id.value);
  }

  async restore(entity: RefreshToken, options?: RepositoryOptions): Promise<void> {
    this.tokens.set(entity.id.value, entity);
  }

  async save(entity: RefreshToken, options?: RepositoryOptions): Promise<void> {
    this.tokens.set(entity.id.value, entity);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return Array.from(this.tokens.values()).find(t => t.id.value === token) || null;
  }

  async revokeAllForUser(userId: UserId): Promise<void> {
    Array.from(this.tokens.values()).forEach(t => {
      if (t.userId.equals(userId)) {
        t.revoke();
      }
    });
  }
}
