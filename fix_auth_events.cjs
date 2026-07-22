const fs = require('fs');
const path = require('path');

const eventsDir = path.join(process.cwd(), 'server/src/modules/auth/domain/events');
const events = fs.readdirSync(eventsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

events.forEach(file => {
  const ev = file.replace('.ts', '');
  const content = `
import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { DomainEventMetadata } from '../../../../core/domain/events/DomainEventMetadata';

export class ${ev} extends DomainEvent {
  constructor(
    aggregateId: string, 
    aggregateType: string,
    public readonly payload: Record<string, unknown> = {},
    metadata?: DomainEventMetadata
  ) {
    super(
      crypto.randomUUID(),
      '${ev}',
      new Date(),
      aggregateId,
      aggregateType,
      1,
      metadata
    );
  }
}
`;
  fs.writeFileSync(path.join(eventsDir, file), content.trim() + '\n');
});
