const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'server/src/modules/mrp/application/services');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            processDir(filePath);
        } else if (file.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');

            if (!content.includes('import { Result }')) {
                content = `import { Result } from '../../../../core';\n` + content;
            }

            // Replace Promise<Type> with Promise<Result<Type>> in method signatures
            content = content.replace(/Promise<([^>]+)>/g, (match, p1) => {
                if (p1.startsWith('Result<')) return match;
                return `Promise<Result<${p1}>>`;
            });
            
            // Replace this.queryBus.execute<Type>(...) with this.queryBus.execute<Result<Type>>(...)
            content = content.replace(/this\.queryBus\.execute<([^>]+)>/g, (match, p1) => {
                if (p1.startsWith('Result<')) return match;
                return `this.queryBus.execute<Result<${p1}>>`;
            });
            
            // Replace this.commandBus.execute<Type>(...) with this.commandBus.execute<Result<Type>>(...)
            content = content.replace(/this\.commandBus\.execute<([^>]+)>/g, (match, p1) => {
                if (p1.startsWith('Result<')) return match;
                return `this.commandBus.execute<Result<${p1}>>`;
            });

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

processDir(servicesDir);
