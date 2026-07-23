import { IRepository } from '../../../../core/domain/repositories/IRepository';
import { RefreshToken } from '../entities/RefreshToken';
import { RefreshTokenId } from '../value-objects/RefreshTokenId';
import { UserId } from '../value-objects/UserId';

export interface IRefreshTokenRepository extends IRepository<RefreshToken, RefreshTokenId> {
  findByToken(token: string): Promise<RefreshToken | null>;
  revokeAllForUser(userId: UserId): Promise<void>;
}
