import { Entity } from '../../../../core/domain/entities/Entity';
import { SessionId } from '../value-objects/SessionId';
import { UserId } from '../value-objects/UserId';
import { SessionStatus } from '../enums/SessionStatus';
import { IdentityException } from '../exceptions/IdentityException';

export class UserSession extends Entity<SessionId> {
  private _userId: UserId;
  private _expiresAt: Date;
  private _revokedAt?: Date;
  private _status: SessionStatus;

  private constructor(
    id: SessionId,
    userId: UserId,
    expiresAt: Date,
    status: SessionStatus,
    createdAt?: Date,
    revokedAt?: Date,
    version?: number
  ) {
    super(id, createdAt, version);
    this._userId = userId;
    this._expiresAt = expiresAt;
    this._status = status;
    this._revokedAt = revokedAt;
  }

  public get userId(): UserId {
    return this._userId;
  }

  public get expiresAt(): Date {
    return this._expiresAt;
  }

  public get revokedAt(): Date | undefined {
    return this._revokedAt;
  }

  public get status(): SessionStatus {
    return this._status;
  }

  public static create(
    id: SessionId,
    userId: UserId,
    expiresAt: Date
  ): UserSession {
    if (!userId) {
      throw new IdentityException('UserId is required for a session');
    }
    if (!expiresAt || expiresAt <= new Date()) {
      throw new IdentityException('Session expiration date must be in the future');
    }

    return new UserSession(id, userId, expiresAt, SessionStatus.ACTIVE);
  }

  public revoke(): void {
    if (this._status === SessionStatus.REVOKED) {
      throw new IdentityException('Session is already revoked');
    }
    this._status = SessionStatus.REVOKED;
    this._revokedAt = new Date();
  }

  public extend(newExpiresAt: Date): void {
    if (this._status !== SessionStatus.ACTIVE) {
      throw new IdentityException('Cannot extend a non-active session');
    }
    if (newExpiresAt <= this._expiresAt) {
      throw new IdentityException('New expiration date must be after current expiration date');
    }
    this._expiresAt = newExpiresAt;
  }

  public expire(): void {
    if (this._status === SessionStatus.EXPIRED) {
      return;
    }
    if (this._status === SessionStatus.REVOKED) {
      throw new IdentityException('Cannot expire a revoked session');
    }
    this._status = SessionStatus.EXPIRED;
  }
}
