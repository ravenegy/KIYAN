const fs = require('fs');
const path = require('path');
let file = path.join(__dirname, 'server/src/modules/bom/module/BomModuleBootstrapper.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  "BomInfrastructureBootstrapper.bootstrap(config.infrastructure);",
  "// BomInfrastructureBootstrapper is handled within BomRepositoryRegistration"
);
content = content.replace(
  "import { BomInfrastructureBootstrapper } from '../infrastructure/bootstrap/BomInfrastructureBootstrapper';\n",
  ""
);
fs.writeFileSync(file, content);
