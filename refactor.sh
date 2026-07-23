#!/bin/bash

# Refactor commands
for file in server/src/modules/mrp/application/commands/*.ts; do
  if [ "$file" == "server/src/modules/mrp/application/commands/index.ts" ]; then continue; fi
  
  sed -i 's/implements ICommand<\(.*\)>/implements ICommand<Result<\1>>/' $file
  
  # Ensure Result is imported
  if ! grep -q "import { Result }" $file; then
    sed -i '1s/^/import { Result } from '\'..\\/..\\/..\\/..\\/core\'';\n/' $file
  fi
done

# Refactor queries
for file in server/src/modules/mrp/application/queries/*.ts; do
  if [ "$file" == "server/src/modules/mrp/application/queries/index.ts" ]; then continue; fi
  
  # Queries might be <X | null>. If so, we need <Result<X>> or <Result<X | null>>
  sed -i 's/implements IQuery<\(.*\)>/implements IQuery<Result<\1>>/' $file
  
  # Ensure Result is imported
  if ! grep -q "import { Result }" $file; then
    sed -i '1s/^/import { Result } from '\'..\\/..\\/..\\/..\\/core\'';\n/' $file
  fi
done

