#!/bin/bash
set -e

# Configuration
FROM="@airgap/beacon-sdk"
TO="@tezos-x/octez.connect-sdk"

echo "Migrating $FROM -> $TO"

# 1. Find files containing the exact string
# We exclude .git, node_modules, and binary files
# limiting to git tracked files for safety, plus the untracked .ai-context.md if needed, but git grep checks tracked.
# We will use git grep to find files.

FILES=$(git grep -lF "$FROM" || true)

if [ -z "$FILES" ]; then
  echo "No files found containing $FROM"
  exit 0
fi

echo "Found occurrences in:"
echo "$FILES"

# 2. Iterate and replace
for file in $FILES; do
  # Double check it's a text file or json
  if file -b --mime-type "$file" | grep -qE "text|json"; then
     echo "Patching $file..."
     # Use distinct sed syntax for macOS compatibility
     sed -i '' "s|$FROM|$TO|g" "$file"
  else
     echo "Skipping binary file $file"
  fi
done

echo "Done. Please check 'git diff' to verify changes."
