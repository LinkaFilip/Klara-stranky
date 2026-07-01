@echo off
setlocal enabledelayedexpansion

echo === Building React app in klara-react/ ===

cd klara-react

echo Installing dependencies...
call npm install

echo Building React app...
call npm run build
if %errorlevel% neq 0 (
    echo React build failed.
    exit /b 1
)

echo Copying build output to repo root dist/...
cd ..
if exist dist rmdir /s /q dist
mkdir dist
xcopy /E /Y klara-react\dist\* dist\

echo Verifying original files still exist...
if not exist script.js (
    echo ERROR: script.js missing!
    exit /b 1
)
if not exist styles.css (
    echo ERROR: styles.css missing!
    exit /b 1
)
if not exist _headers (
    echo ERROR: _headers missing!
    exit /b 1
)
if not exist my-fullpage\dist\my-fullpage.js (
    echo ERROR: my-fullpage.js missing!
    exit /b 1
)

echo === Build complete! ===
echo Original files preserved.
echo React app built in dist/
