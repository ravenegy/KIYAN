const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'server/src/modules/identity/application');

// Fix handlers
const handlersDir = path.join(baseDir, 'handlers');
const handlers = fs.readdirSync(handlersDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

handlers.forEach(file => {
  let content = fs.readFileSync(path.join(handlersDir, file), 'utf8');
  content = content.replace(/from '\.\.\/commands\/[a-zA-Z0-9_]+'/g, "from '../commands'");
  content = content.replace(/from '\.\.\/queries\/[a-zA-Z0-9_]+'/g, "from '../queries'");
  content = content.replace(/from '\.\.\/dto\/[a-zA-Z0-9_]+'/g, "from '../dto'");
  fs.writeFileSync(path.join(handlersDir, file), content);
});

// Fix commands
const commandsDir = path.join(baseDir, 'commands');
const commands = fs.readdirSync(commandsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

commands.forEach(file => {
  let content = fs.readFileSync(path.join(commandsDir, file), 'utf8');
  content = content.replace(/from '\.\.\/dto\/[a-zA-Z0-9_]+'/g, "from '../dto'");
  content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/core\/mediator\/commands\/ICommand'/g, "from '../../../../core'");
  content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/core\/results\/Result'/g, "from '../../../../core'");
  fs.writeFileSync(path.join(commandsDir, file), content);
});

// Fix queries
const queriesDir = path.join(baseDir, 'queries');
const queries = fs.readdirSync(queriesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

queries.forEach(file => {
  let content = fs.readFileSync(path.join(queriesDir, file), 'utf8');
  content = content.replace(/from '\.\.\/dto\/[a-zA-Z0-9_]+'/g, "from '../dto'");
  content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/core\/mediator\/queries\/IQuery'/g, "from '../../../../core'");
  content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/core\/results\/Result'/g, "from '../../../../core'");
  fs.writeFileSync(path.join(queriesDir, file), content);
});

// Fix validators
const validatorsDir = path.join(baseDir, 'validators');
const validators = fs.readdirSync(validatorsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

validators.forEach(file => {
  let content = fs.readFileSync(path.join(validatorsDir, file), 'utf8');
  content = content.replace(/from '\.\.\/\.\.\/\.\.\/\.\.\/core\/results\/Result'/g, "from '../../../../core'");
  fs.writeFileSync(path.join(validatorsDir, file), content);
});

