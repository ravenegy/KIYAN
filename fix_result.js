const fs = require('fs');
const glob = require('glob'); // Note: we can just use native readdir or shell expansion, I will use shell arguments

const files = process.argv.slice(2);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/Result\.fail\(([^)]+)\)/g, (match, p1) => {
    return `Result.failure({ code: 'SALES_ERROR', message: ${p1} })`;
  });
  fs.writeFileSync(file, content);
}
