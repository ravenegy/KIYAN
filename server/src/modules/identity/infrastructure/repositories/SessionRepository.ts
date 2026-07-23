import { IUserSessionRepository } from '../../domain/repositories/IUserSessionRepository';
import { UserSession } from '../../domain/entities/UserSession';
import { SessionId } from '../../domain/value-objects/SessionId';
import { UserId } from '../../domain/value-objects/UserId';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';

export class SessionRepository implements IUserSessionRepository {
  private sessions: Map<string, UserSession> = new Map();

  async getById(id: SessionId, options?: RepositoryOptions): Promise<UserSession | null> {
    return this.sessions.get(id.value) || null;
  }

  async exists(id: SessionId, options?: RepositoryOptions): Promise<boolean> {
    return this.sessions.has(id.value);
  }

  async count(query?: RepositoryQuery<UserSession>, options?: RepositoryOptions): Promise<number> {
    return this.sessions.size;
  }

  async find(query?: RepositoryQuery<UserSession>, options?: RepositoryOptions): Promise<PagedResult<UserSession>> {
    const items = Array.from(this.sessions.values());
    return new PagedResult<UserSession>(items, items.length, 1, items.length);
  }

  async findOne(query?: RepositoryQuery<UserSession>, options?: RepositoryOptions): Promise<UserSession | null> {
    return Array.from(this.sessions.values())[0] || null;
  }

  async add(entity: UserSession, options?: RepositoryOptions): Promise<void> {
    this.sessions.set(entity.id.value, entity);
  }

  async update(entity: UserSession, options?: RepositoryOptions): Promise<void> {
    this.sessions.set(entity.id.value, entity);
  }

  async delete(entity: UserSession, options?: RepositoryOptions): Promise<void> {
    this.sessions.delete(entity.id.value);
  }

  async softDelete(entity: UserSession, options?: RepositoryOptions): Promise<void> {
    this.sessions.delete(entity.id.value);
  }

  async restore(entity: UserSession, options?: RepositoryOptions): Promise<void> {
    this.sessions.set(entity.id.value, entity);
  }

  async save(entity: UserSession, options?: RepositoryOptions): Promise<void> {
    this.sessions.set(entity.id.value, entity);
  }

  async findByUserId(userId: UserId): Promise<UserSession[]> {
    return Array.from(this.sessions.values()).filter(s => s.userId.equals(userId));
  }

  async revokeAllForUser(userId: UserId): Promise<void> {
    Array.from(this.sessions.values()).forEach(s => {
      if (s.userId.equals(userId)) {
        s.revoke();
      }
    });
  }
}
