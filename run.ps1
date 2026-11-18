Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Utsav Events - Event Management Platform" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path "data\db")) {
  New-Item -ItemType Directory -Force -Path "data\db" | Out-Null
}

$mongoActive = Get-NetTCPConnection -LocalPort 27017 -ErrorAction SilentlyContinue
if ($mongoActive) {
  Write-Host "[1/2] MongoDB is already active on port 27017." -ForegroundColor Green
} else {
  $mongodCmd = Get-Command mongod -ErrorAction SilentlyContinue
  if ($mongodCmd) {
    Write-Host "[1/2] Starting local MongoDB instance on port 27017..." -ForegroundColor Yellow
    Start-Process mongod -ArgumentList "--dbpath `"data\db`"" -WindowStyle Minimized
    Start-Sleep -Seconds 3
  } else {
    Write-Host "[1/2] Please ensure MongoDB service is active." -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "[2/2] Launching Backend Server (Port 5000) and Frontend (Port 5173)..." -ForegroundColor Green
Write-Host ""
Write-Host "------------------------------------------------------------" -ForegroundColor Cyan
Write-Host "  Website URL:   http://localhost:5173" -ForegroundColor White
Write-Host "  Backend API:   http://localhost:5000/api/health" -ForegroundColor White
Write-Host "------------------------------------------------------------" -ForegroundColor Cyan
Write-Host ""

Start-Process "http://localhost:5173"

npm run dev
