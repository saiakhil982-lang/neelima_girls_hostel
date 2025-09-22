@echo off
echo ========================================
echo   Neelima Girls Hostel - Free Deploy
echo ========================================
echo.
echo This will help you deploy your website for FREE!
echo.
echo Step 1: Create Heroku account at heroku.com
echo Step 2: Install Heroku CLI from devcenter.heroku.com
echo Step 3: Run this script again after installation
echo.
pause
echo.
echo Checking if Heroku CLI is installed...
heroku --version
if %errorlevel% neq 0 (
    echo.
    echo Heroku CLI not found. Please install it first:
    echo 1. Go to devcenter.heroku.com/articles/heroku-cli
    echo 2. Download and install Heroku CLI
    echo 3. Restart your computer
    echo 4. Run this script again
    pause
    exit
)
echo.
echo Heroku CLI found! Starting deployment...
echo.
echo Step 1: Logging into Heroku...
heroku login
echo.
echo Step 2: Creating your app...
heroku create neelima-girls-hostel
echo.
echo Step 3: Deploying your website...
git init
git add .
git commit -m "Deploy Neelima Girls Hostel website"
git push heroku main
echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your website is now live at:
echo https://neelima-girls-hostel.herokuapp.com
echo.
echo Share this link with anyone!
echo Admin password: neelima2024
echo.
pause
