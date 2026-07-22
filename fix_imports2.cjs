const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'server/src/modules/identity/application/handlers');
const handlers = fs.readdirSync(baseDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

handlers.forEach(file => {
  let content = fs.readFileSync(path.join(baseDir, file), 'utf8');
  content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/core\/results\/Result'/g, "from '../../../../core'");
  content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/core\/mediator\/commands\/ICommandHandler'/g, "from '../../../../core'");
  content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/core\/mediator\/queries\/IQueryHandler'/g, "from '../../../../core'");
  
  // Condense duplicate imports
  let hasResult = content.includes('Result');
  let hasCommandHandler = content.includes('ICommandHandler');
  let hasQueryHandler = content.includes('IQueryHandler');
  
  let newCoreImports = [];
  if (hasResult) newCoreImports.push('Result');
  if (hasCommandHandler) newCoreImports.push('ICommandHandler');
  if (hasQueryHandler) newCoreImports.push('IQueryHandler');
  
  // Remove existing core imports
  content = content.replace(/import { [a-zA-Z0-9_, ]+ } from '\.\.\/\.\.\/\.\.\/\.\.\/core';\n/g, '');
  
  // Add unified core import
  if (newCoreImports.length > 0) {
    content = `import { ${newCoreImports.join(', ')} } from '../../../../core';\n` + content;
  }
  
  fs.writeFileSync(path.join(baseDir, file), content);
});

