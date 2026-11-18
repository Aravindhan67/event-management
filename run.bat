@echo off
title Utsav Events Platform
echo ============================================================
echo   Utsav Events - Event Management Platform
echo ============================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Node.js is not installed or not in PATH.
  echo Please install Node.js from https://nodejs.org
  pause
  exit /b 1
)

if not exist "data\db" (
  mkdir "data\db"
)

echo [1/2] Checking MongoDB...
netstat -ano | findstr :27017 >nul 2>nul
if %ERRORLEVEL% equ 0 (
  echo MongoDB is already active on port 27017.
) else (
  where mongod >nul 2>nul
  if %ERRORLEVEL% equ 0 (
    echo Starting local MongoDB on port 27017...
    start "JeyamEvents-MongoDB" /min mongod --dbpath "data\db"
    timeout /t 3 /nobreak >nul
  ) else (
    echo [Notice] Ensure MongoDB service is running or check server\.env
  )
)

echo.
echo [2/2] Launching Backend Server (Port 5000) and Frontend (Port 5173)...
echo.
echo ------------------------------------------------------------
echo   Website URL:   http://localhost:5173
echo   Backend API:   http://localhost:5000/api/health
echo ------------------------------------------------------------
echo.
echo Opening browser in 3 seconds...
start "" http://localhost:5173
echo.
echo Press Ctrl+C in this window anytime to stop the website.
echo.

npm run dev
