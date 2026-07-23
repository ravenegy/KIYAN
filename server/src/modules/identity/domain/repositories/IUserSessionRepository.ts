import { IRepository } from '../../../../core/domain/repositories/IRepository';
import { UserSession } from '../entities/UserSession';
import { SessionId } from '../value-objects/SessionId';
import { UserId } from '../value-objects/UserId';

export interface IUserSessionRepository extends IRepository<UserSession, SessionId> {
  findByUserId(userId: UserId): Promise<UserSession[]>;
  revokeAllForUser(userId: UserId): Promise<void>;
}
