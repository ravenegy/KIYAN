export interface DomainEventMetadataProps {
  correlationId?: string;
  causationId?: string;
  tenantId?: string;
  userId?: string;
  traceId?: string;
  tags?: string[];
}

export class DomainEventMetadata {
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly tenantId?: string;
  public readonly userId?: string;
  public readonly traceId?: string;
  public readonly tags?: ReadonlyArray<string>;

  constructor(props?: DomainEventMetadataProps) {
    this.correlationId = props?.correlationId;
    this.causationId = props?.causationId;
    this.tenantId = props?.tenantId;
    this.userId = props?.userId;
    this.traceId = props?.traceId;
    this.tags = props?.tags ? Object.freeze([...props.tags]) : undefined;
    Object.freeze(this);
  }
}
