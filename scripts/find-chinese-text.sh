#!/bin/bash

# Script to find Chinese characters in .tsx and .ts files
# Usage: ./scripts/find-chinese-text.sh [directory]

SEARCH_DIR="${1:-app/[locale]}"

echo "Searching for Chinese characters in: $SEARCH_DIR"
echo "================================================"
echo ""

# Find all .tsx and .ts files and search for Chinese characters
find "$SEARCH_DIR" -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "*/node_modules/*" | while read -r file; do
  # Check if file contains Chinese characters
  if grep -qP '[\p{Han}]' "$file" 2>/dev/null; then
    echo "File: $file"
    # Show lines with Chinese characters (with line numbers)
    grep -nP '[\p{Han}]' "$file" | head -20
    echo "---"
    echo ""
  fi
done

echo "================================================"
echo "Search complete!"
