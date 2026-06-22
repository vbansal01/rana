# ─────────────────────────────────────────────────────────────────────────────
# RANA.org — Vercel Deploy Script (PowerShell)
# Usage: .\deploy.ps1 -Token "your_vercel_token_here"
# ─────────────────────────────────────────────────────────────────────────────
param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

$ErrorActionPreference = "Stop"
$ProjectDir = $PSScriptRoot

Write-Host "`n🚀 RANA.org Vercel Deployment" -ForegroundColor Cyan
Write-Host "─────────────────────────────" -ForegroundColor DarkGray

# Step 1: Check Node / npm
Write-Host "`n[1/4] Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "   ✓ Node $nodeVersion" -ForegroundColor Green

# Step 2: npm install
Write-Host "`n[2/4] Installing dependencies..." -ForegroundColor Yellow
Set-Location $ProjectDir
npm install
if ($LASTEXITCODE -ne 0) { Write-Host "❌ npm install failed" -ForegroundColor Red; exit 1 }
Write-Host "   ✓ Dependencies installed" -ForegroundColor Green

# Step 3: Install Vercel CLI
Write-Host "`n[3/4] Installing Vercel CLI..." -ForegroundColor Yellow
npm install -g vercel 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "   Trying with npx instead..." -ForegroundColor DarkGray
}
Write-Host "   ✓ Vercel CLI ready" -ForegroundColor Green

# Step 4: Deploy
Write-Host "`n[4/4] Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "   (This may take 1-2 minutes)" -ForegroundColor DarkGray

vercel deploy --prod --token $Token --yes --name rana-org

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deployed successfully!" -ForegroundColor Green
    Write-Host "`n⚠️  IMPORTANT — Set these environment variables in Vercel Dashboard:" -ForegroundColor Yellow
    Write-Host "   https://vercel.com/dashboard → rana-org → Settings → Environment Variables" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "   NEXTAUTH_SECRET      = (generate: openssl rand -base64 32)" -ForegroundColor White
    Write-Host "   NEXTAUTH_URL         = https://your-domain.vercel.app" -ForegroundColor White
    Write-Host "   NEXT_PUBLIC_SUPABASE_URL      = https://xxxx.supabase.co" -ForegroundColor White
    Write-Host "   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ..." -ForegroundColor White
    Write-Host "   SUPABASE_SERVICE_ROLE_KEY     = eyJ..." -ForegroundColor White
    Write-Host ""
    Write-Host "   After adding env vars, redeploy: vercel --prod --token $Token" -ForegroundColor DarkGray
} else {
    Write-Host "`n❌ Deployment failed. Check the output above." -ForegroundColor Red
    exit 1
}
