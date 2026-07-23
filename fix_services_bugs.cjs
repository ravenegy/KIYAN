const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'server/src/modules/mrp/application/services/impl');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (!file.endsWith('.ts')) continue;
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Remove duplicate wrong import
        content = content.replace(/import\s*{\s*Result\s*}\s*from\s*"..\/..\/..\/..\/core";\n/g, '');
        content = content.replace(/import\s*{\s*Result\s*}\s*from\s*'..\/..\/..\/..\/core';\n/g, '');

        // 2. Fix returning Result.success(result) -> return result;
        content = content.replace(/const result = await this.commandBus.execute<Result<string>>\(command\);\n\s*return Result.success\(result\);/g, 'return await this.commandBus.execute<Result<string>>(command);');
        content = content.replace(/await this.commandBus.execute<Result<void>>\(command\);\n\s*return Result.success\(\);/g, 'return await this.commandBus.execute<Result<void>>(command);');

        fs.writeFileSync(filePath, content, 'utf8');
    }
}

processDir(servicesDir);

