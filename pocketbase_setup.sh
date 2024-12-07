#!/bin/bash

# Create destination directory if it doesn't exist
mkdir -p ./src/pocketbase

# Determine OS
case "$(uname -s)" in
    Linux*)     OS=linux;;
    Darwin*)    OS=darwin;; # MacOS
    CYGWIN*|MINGW*|MSYS*) OS=windows;;
    *)          echo "Unsupported operating system"; exit 1;;
esac

# Determine architecture
ARCH=$(uname -m)
case "$ARCH" in
    x86_64|amd64) ARCH="amd64";;
    aarch64|arm64) ARCH="arm64";;
    *)          echo "Unsupported architecture"; exit 1;;
esac

# Set PocketBase version and construct download URL
PB_VERSION="0.23.3"
FILENAME="pocketbase_${PB_VERSION}_${OS}_${ARCH}"

if [ "$OS" = "windows" ]; then
    FILENAME="${FILENAME}.zip"
    EXECUTABLE_NAME="pocketbase.exe"
    FINAL_NAME="run.exe"
else
    FILENAME="${FILENAME}.zip"
    EXECUTABLE_NAME="pocketbase"
    FINAL_NAME="run"
fi

DOWNLOAD_URL="https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/${FILENAME}"

# Download PocketBase
echo "Downloading PocketBase from $DOWNLOAD_URL..."
if ! curl -L -o "$FILENAME" "$DOWNLOAD_URL"; then
    echo "Download failed"
    exit 1
fi

# Extract PocketBase
echo "Extracting PocketBase..."
if [ "$OS" = "windows" ]; then
    unzip -j "$FILENAME" "$EXECUTABLE_NAME" -d "./src/pocketbase"
else
    unzip -j "$FILENAME" "$EXECUTABLE_NAME" -d "./src/pocketbase"
fi

# Rename executable to "run"
echo "Renaming executable to ${FINAL_NAME}..."
mv "./src/pocketbase/$EXECUTABLE_NAME" "./src/pocketbase/$FINAL_NAME"

# Set executable permissions (except on Windows)
if [ "$OS" != "windows" ]; then
    chmod +x "./src/pocketbase/$FINAL_NAME"
fi

# Clean up
echo "Cleaning up..."
rm "$FILENAME"

echo "PocketBase installation complete!"
echo "Binary location: ./src/pocketbase/$FINAL_NAME"
