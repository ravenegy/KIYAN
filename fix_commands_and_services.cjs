const fs = require('fs');
const path = require('path');

const commandsDir = path.join(__dirname, 'server/src/modules/mrp/application/commands');
const servicesDir = path.join(__dirname, 'server/src/modules/mrp/application/services/impl');

// 1. Fix commands _resultType
function fixCommands() {
    const files = fs.readdirSync(commandsDir);
    for (const file of files) {
        if (file === 'index.ts') continue;
        const filePath = path.join(commandsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        content = content.replace(/_resultType\?:\s*([^;]+);/, (match, p1) => {
            if (p1.startsWith('Result<')) return match;
            return `_resultType?: Result<${p1}>;`;
        });

        fs.writeFileSync(filePath, content, 'utf8');
    }
}

// 2. Fix services relative path and duplicates
function fixServices() {
    const files = fs.readdirSync(servicesDir);
    for (const file of files) {
        if (!file.endsWith('.ts')) continue;
        const filePath = path.join(servicesDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace duplicate Result imports
        content = content.replace(/import\s*{\s*Result\s*}\s*from\s*'[^']+';\nimport\s*{\s*Result\s*}\s*from\s*'[^']+';/g, "import { Result } from '../../../../../core';");

        // Replace wrong relative paths
        content = content.replace(/import\s*{\s*Result\s*}\s*from\s*'\.\.\/\.\.\/\.\.\/\.\.\/core';/g, "import { Result } from '../../../../../core';");

        fs.writeFileSync(filePath, content, 'utf8');
    }
}

fixCommands();
fixServices();
