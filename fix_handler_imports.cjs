const fs = require('fs');
const path = require('path');

const handlersDir = path.join(__dirname, 'server/src/modules/mrp/application/handlers');
const queriesDir = path.join(__dirname, 'server/src/modules/mrp/application/queries');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'index.ts') continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            processDir(filePath);
        } else {
            let content = fs.readFileSync(filePath, 'utf8');

            if (dir.includes('handlers')) {
                if (!content.includes('import { Result')) {
                    content = `import { Result, ErrorCode } from '../../../../../core';\n` + content;
                } else if (!content.includes('ErrorCode')) {
                    content = content.replace('import { Result }', 'import { Result, ErrorCode }');
                }
            } else if (dir.includes('queries')) {
                // Fix `_resultType?: X;` to `_resultType?: Result<X>;`
                content = content.replace(/_resultType\?:\s*([^;]+);/, (match, p1) => {
                    if (p1.startsWith('Result<')) return match;
                    return `_resultType?: Result<${p1}>;`;
                });
            }

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

processDir(handlersDir);
processDir(queriesDir);

