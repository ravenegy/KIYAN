const fs = require('fs');
const path = require('path');

const handlersDir = path.join(__dirname, 'server/src/modules/mrp/application/handlers');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'index.ts') continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            processDir(filePath);
        } else {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // 1. ICommandHandler<Command, X> -> ICommandHandler<Command, Result<X>>
            content = content.replace(/ICommandHandler<([^,]+),\s*([^>]+)>/g, (match, p1, p2) => {
                if (p2.startsWith('Result<')) return match;
                return `ICommandHandler<${p1}, Result<${p2}>>`;
            });
            
            // 2. IQueryHandler<Query, X> -> IQueryHandler<Query, Result<X>>
            content = content.replace(/IQueryHandler<([^,]+),\s*([^>]+)>/g, (match, p1, p2) => {
                if (p2.startsWith('Result<')) return match;
                return `IQueryHandler<${p1}, Result<${p2}>>`;
            });
            
            // 3. Promise<X> -> Promise<Result<X>> (only in handle method signature)
            content = content.replace(/public async handle\(([^)]+)\):\s*Promise<([^>]+)>/g, (match, p1, p2) => {
                if (p2.startsWith('Result<')) return match;
                return `public async handle(${p1}): Promise<Result<${p2}>>`;
            });

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

processDir(handlersDir);
