#!/bin/bash
set -e

# Configuration
FROM="node_modules/beacon-sdk"
TO="node_modules/octez.connect-sdk"

echo "Migrating local path $FROM -> $TO"

# 1. Find files containing the exact string
FILES=$(git grep -lF "$FROM" || true)

if [ -z "$FILES" ]; then
  echo "No files found containing $FROM"
  exit 0
fi

echo "Found occurrences in:"
echo "$FILES"

# 2. Iterate and replace
for file in $FILES; do
  # Double check it's a text file
  if file -b --mime-type "$file" | grep -qE "text|json"; then
     echo "Patching $file..."
     sed -i '' "s|$FROM|$TO|g" "$file"
  else
     echo "Skipping binary file $file"
  fi
done

echo "Done."
