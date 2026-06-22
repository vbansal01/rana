@echo off
:: ─────────────────────────────────────────────────────────────────────────────
:: RANA.org — Vercel Deploy (Windows Batch fallback)
:: Double-click OR run: deploy.bat YOUR_VERCEL_TOKEN
:: ─────────────────────────────────────────────────────────────────────────────

SET TOKEN=%1

IF "%TOKEN%"=="" (
    echo.
    echo Usage: deploy.bat YOUR_VERCEL_TOKEN
    echo.
    echo Get your token at: https://vercel.com/account/tokens
    pause
    exit /b 1
)

echo.
echo  RANA.org Vercel Deployment
echo  ---------------------------
echo.

:: Check Node
node --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo [ERROR] Node.js not found. Install from https://nodejs.org
    pause
    exit /b 1
)

echo [1/3] Installing npm dependencies...
cd /d "%~dp0"
call npm install
IF ERRORLEVEL 1 ( echo [ERROR] npm install failed & pause & exit /b 1 )

echo [2/3] Installing Vercel CLI...
call npm install -g vercel >nul 2>&1

echo [3/3] Deploying to Vercel (this takes 1-2 min)...
call vercel deploy --prod --token %TOKEN% --yes --name rana-org

IF ERRORLEVEL 1 (
    echo.
    echo [ERROR] Deployment failed. See output above.
    pause
    exit /b 1
)

echo.
echo  SUCCESS! Site is live on Vercel.
echo.
echo  NEXT STEP - Add environment variables in Vercel Dashboard:
echo  https://vercel.com/dashboard - rana-org - Settings - Environment Variables
echo.
echo  Required variables:
echo    NEXTAUTH_SECRET
echo    NEXTAUTH_URL
echo    NEXT_PUBLIC_SUPABASE_URL
echo    NEXT_PUBLIC_SUPABASE_ANON_KEY
echo    SUPABASE_SERVICE_ROLE_KEY
echo.
pause
