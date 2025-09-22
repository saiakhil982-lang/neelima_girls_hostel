@echo off
echo ========================================
echo   Update Neelima Girls Hostel Website
echo ========================================
echo.
echo This script will update your live website
echo with any changes you've made locally.
echo.
echo Make sure you've edited your files first!
echo.
pause
echo.
echo Step 1: Adding all changes...
git add .
echo.
echo Step 2: Committing changes...
set /p commit_msg="Enter a description of your changes: "
git commit -m "%commit_msg%"
echo.
echo Step 3: Deploying to live website...
git push heroku main
echo.
echo ========================================
echo   UPDATE COMPLETE!
echo ========================================
echo.
echo Your website has been updated at:
echo https://neelima-girls-hostel.herokuapp.com
echo.
echo Changes should be visible within 2-3 minutes.
echo.
pause
