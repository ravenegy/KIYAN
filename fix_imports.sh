#!/bin/bash
for file in server/src/modules/mrp/application/commands/*.ts server/src/modules/mrp/application/queries/*.ts; do
  sed -i "s/import { Result } from '..\/..\/..\/..\/core';import/import { Result } from '..\/..\/..\/..\/core';\nimport/g" $file
done
npx prettier --write "server/src/modules/mrp/application/commands/*.ts" "server/src/modules/mrp/application/queries/*.ts"
