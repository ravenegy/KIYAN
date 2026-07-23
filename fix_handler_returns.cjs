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

            // Replace `throw new Error(...)` with `return Result.fail(...)` (assuming it's a domain error format or string)
            // But actually we have `throw new Error(somethingResult.error?.message || '...');`
            // Let's replace the whole throw block.
            content = content.replace(/throw new Error\([^)]+\);/g, (match) => {
                // If it's `throw new Error(result.error?.message || ...)`
                return `return Result.fail({ code: ErrorCode.Unexpected, message: ${match.slice(16, -2)} });`;
            });
            
            // Wait, we need to carefully replace the returns.
            // For now, let's just do a blanket regex for return something; where something is not Result.
            content = content.replace(/return ([^;]+);/g, (match, p1) => {
                if (p1.startsWith('Result.') || p1 === 'null' || p1.includes('Result<')) return match;
                // If the query returns a Result<T | null>, we could return Result.ok(null) 
                // Wait, some methods return `void`. They just have `return;` or no return.
                if (p1.trim() === '') return match;
                
                return `return Result.ok(${p1});`;
            });

            // Let's also fix empty return or end of void functions to return Result.ok()
            // If the handle returns Promise<Result<void>> and there's no return at the end
            if (content.includes('Promise<Result<void>>')) {
                if (!content.includes('return Result.ok()') && !content.includes('return Result.ok(undefined)')) {
                    content = content.replace(/}\n}/g, '  return Result.ok();\n  }\n}');
                }
            }

            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

processDir(handlersDir);
