import { IDomainClock } from './IDomainClock';
import { IDomainGuid } from './IDomainGuid';

export interface DomainServiceContextProps {
  readonly clock: IDomainClock;
  readonly guidProvider: IDomainGuid;
  readonly currentUser?: string;
  readonly tenant?: string;
  readonly culture?: string;
  readonly correlationId?: string;
  readonly requestId?: string;
  readonly traceId?: string;
}

export class DomainServiceContext {
  public readonly clock: IDomainClock;
  public readonly guidProvider: IDomainGuid;
  public readonly currentUser?: string;
  public readonly tenant?: string;
  public readonly culture?: string;
  public readonly correlationId?: string;
  public readonly requestId?: string;
  public readonly traceId?: string;

  constructor(props: DomainServiceContextProps) {
    this.clock = props.clock;
    this.guidProvider = props.guidProvider;
    this.currentUser = props.currentUser;
    this.tenant = props.tenant;
    this.culture = props.culture;
    this.correlationId = props.correlationId;
    this.requestId = props.requestId;
    this.traceId = props.traceId;
    Object.freeze(this);
  }
}
