const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'server/src/modules/identity/application/dto');
const dtos = fs.readdirSync(baseDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

dtos.forEach(file => {
  let content = fs.readFileSync(path.join(baseDir, file), 'utf8');
  // replace string[] with ReadonlyArray<string>
  content = content.replace(/([a-zA-Z0-9_]+)\[\]/g, 'ReadonlyArray<$1>');
  fs.writeFileSync(path.join(baseDir, file), content);
});
