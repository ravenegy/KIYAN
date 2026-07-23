const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/bom/application/dto');

function makeReadonly(subpath) {
    const p = path.join(modDir, subpath);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');
    // Basic replace: any property definition starting with 2 spaces and not a method
    // In our DTOs they look like: "  id: string;"
    content = content.replace(/^  ([a-zA-Z0-9_]+\??:)/gm, '  readonly $1');
    fs.writeFileSync(p, content);
}

makeReadonly('BomComponentDto.ts');
makeReadonly('BomDto.ts');
makeReadonly('BomSummaryDto.ts');
