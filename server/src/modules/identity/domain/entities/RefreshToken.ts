import { Entity } from '../../../../core/domain/entities/Entity';
import { RefreshTokenId } from '../value-objects/RefreshTokenId';
import { UserId } from '../value-objects/UserId';
import { IdentityException } from '../exceptions/IdentityException';

export class RefreshToken extends Entity<RefreshTokenId> {
  private _userId: UserId;
  private _expiresAt: Date;
  private _consumedAt?: Date;
  private _revokedAt?: Date;

  private constructor(
    id: RefreshTokenId,
    userId: UserId,
    expiresAt: Date,
    createdAt?: Date,
    consumedAt?: Date,
    revokedAt?: Date,
    version?: number
  ) {
    super(id, createdAt, version);
    this._userId = userId;
    this._expiresAt = expiresAt;
    this._consumedAt = consumedAt;
    this._revokedAt = revokedAt;
  }

  public get userId(): UserId {
    return this._userId;
  }

  public get expiresAt(): Date {
    return this._expiresAt;
  }

  public get consumedAt(): Date | undefined {
    return this._consumedAt;
  }

  public get revokedAt(): Date | undefined {
    return this._revokedAt;
  }

  public static create(
    id: RefreshTokenId,
    userId: UserId,
    expiresAt: Date
  ): RefreshToken {
    if (!userId) {
      throw new IdentityException('UserId is required for a refresh token');
    }
    if (!expiresAt || expiresAt <= new Date()) {
      throw new IdentityException('Refresh token expiration date must be in the future');
    }

    return new RefreshToken(id, userId, expiresAt);
  }

  public consume(): void {
    if (this.isExpired()) {
      throw new IdentityException('Cannot consume an expired refresh token');
    }
    if (this._revokedAt) {
      throw new IdentityException('Cannot consume a revoked refresh token');
    }
    if (this._consumedAt) {
      throw new IdentityException('Refresh token is already consumed');
    }
    this._consumedAt = new Date();
  }

  public revoke(): void {
    if (this._revokedAt) {
      throw new IdentityException('Refresh token is already revoked');
    }
    this._revokedAt = new Date();
  }

  public isExpired(): boolean {
    return new Date() >= this._expiresAt;
  }
}
