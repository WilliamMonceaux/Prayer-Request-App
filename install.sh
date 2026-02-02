#!/bin/bash

REPO="IOD-SE/IOD-LASER-Kit"
BRANCH="main"
BASE_URL="https://raw.githubusercontent.com/$REPO/$BRANCH"

echo "🔫 Firing LASER v1.0 ..."

# Function to download with error checking
download_file() {
    local remote_path=$1
    local local_path=$2
    
    # Use -f to fail on HTTP errors (404)
    # Use -s for silent mode
    # Use -S to show errors if they occur
    if curl -fsSL "$BASE_URL/$remote_path" -o "$local_path"; then
        echo "✅ Installed $local_path"
    else
        echo "❌ Error: Could not find '$remote_path' in $REPO/$BRANCH."
        echo "   Please check if the file exists on GitHub."
        # Optional: exit 1 to stop the script entirely
    fi
}

mkdir -p .vscode

# Download root files
download_file ".flake8" ".flake8"
download_file ".gitignore" ".gitignore"
download_file ".markdownlint.json" ".markdownlint.json"
download_file ".prettierrc.json" ".prettierrc.json"

# Download .vscode files
download_file ".vscode/extensions.json" ".vscode/extensions.json"
download_file ".vscode/settings.json" ".vscode/settings.json"

echo "✨ LASER setup complete."
