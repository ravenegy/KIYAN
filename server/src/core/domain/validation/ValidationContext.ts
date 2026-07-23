import { IDomainClock } from '../services/IDomainClock';
import { IDomainGuid } from '../services/IDomainGuid';

export interface ValidationContextProps {
  readonly currentUser?: string;
  readonly tenant?: string;
  readonly culture?: string;
  readonly timezone?: string;
  readonly requestId?: string;
  readonly correlationId?: string;
  readonly traceId?: string;
  readonly clock?: IDomainClock;
  readonly guidProvider?: IDomainGuid;
  readonly metadata?: Record<string, unknown>;
}

export class ValidationContext {
  public readonly currentUser?: string;
  public readonly tenant?: string;
  public readonly culture?: string;
  public readonly timezone?: string;
  public readonly requestId?: string;
  public readonly correlationId?: string;
  public readonly traceId?: string;
  public readonly clock?: IDomainClock;
  public readonly guidProvider?: IDomainGuid;
  public readonly metadata?: Record<string, unknown>;

  constructor(props: ValidationContextProps = {}) {
    this.currentUser = props.currentUser;
    this.tenant = props.tenant;
    this.culture = props.culture;
    this.timezone = props.timezone;
    this.requestId = props.requestId;
    this.correlationId = props.correlationId;
    this.traceId = props.traceId;
    this.clock = props.clock;
    this.guidProvider = props.guidProvider;
    this.metadata = props.metadata ? Object.freeze({ ...props.metadata }) : undefined;
    Object.freeze(this);
  }
}
