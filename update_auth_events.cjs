const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'server/src/modules/auth/domain');
const eventsDir = path.join(baseDir, 'events');

const events = [
  'RoleCreated', 'RoleUpdated', 'RoleDeleted',
  'PermissionCreated', 'PermissionUpdated', 'PermissionDeleted',
  'PermissionGranted', 'PermissionRevoked',
  'RoleAssigned', 'RoleUnassigned', 'HierarchyChanged'
];

events.forEach(ev => {
  const content = `
import { IDomainEvent } from '../../../../core/domain/events/IDomainEvent';
import { DomainEventMetadata } from '../../../../core/domain/events/DomainEventMetadata';

export class ${ev} implements IDomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public readonly eventType: string = '${ev}';
  public readonly version: number = 1;
  
  constructor(
    public readonly aggregateId: string, 
    public readonly aggregateType: string,
    public readonly payload: Record<string, unknown> = {},
    public readonly metadata?: DomainEventMetadata
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredOn = new Date();
  }
}
`;
  fs.writeFileSync(path.join(eventsDir, `${ev}.ts`), content.trim() + '\n');
});

