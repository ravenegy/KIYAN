import { IDomainClock } from '../services/IDomainClock';
import { IDomainGuid } from '../services/IDomainGuid';

export interface FactoryContextProps {
  readonly clock: IDomainClock;
  readonly guidProvider: IDomainGuid;
  readonly metadata?: Record<string, unknown>;
}

export class FactoryContext {
  public readonly clock: IDomainClock;
  public readonly guidProvider: IDomainGuid;
  public readonly metadata?: Record<string, unknown>;

  constructor(props: FactoryContextProps) {
    this.clock = props.clock;
    this.guidProvider = props.guidProvider;
    this.metadata = props.metadata ? Object.freeze({ ...props.metadata }) : undefined;
    Object.freeze(this);
  }
}
