# Create destination directory if it doesn't exist
New-Item -Path "./src/pocketbase" -ItemType Directory -Force

# Set PocketBase version
$PB_VERSION = "0.23.3"
$FILENAME = "pocketbase_${PB_VERSION}_windows_amd64.zip"
$DOWNLOAD_URL = "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/${FILENAME}"

# Download PocketBase
Write-Host "Downloading PocketBase from $DOWNLOAD_URL..."
Invoke-WebRequest -Uri $DOWNLOAD_URL -OutFile $FILENAME

# Extract PocketBase
Write-Host "Extracting PocketBase..."
Expand-Archive -Path $FILENAME -DestinationPath "./temp" -Force
Move-Item -Path "./temp/pocketbase.exe" -Destination "./src/pocketbase/run.exe" -Force

# Clean up
Write-Host "Cleaning up..."
Remove-Item -Path $FILENAME -Force
Remove-Item -Path "./temp" -Force -Recurse

Write-Host "PocketBase installation complete!"
Write-Host "Binary location: ./src/pocketbase/run.exe"