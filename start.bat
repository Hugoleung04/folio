@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Folio
echo.
echo   Folio  study notes
echo   Opening in your browser...
echo   Keep this window open while you use the app.
echo   Close this window to stop.
echo.

where py >nul 2>&1
if %errorlevel%==0 (
  py -3 start.py
  goto :eof
)
where python >nul 2>&1
if %errorlevel%==0 (
  python start.py
  goto :eof
)
where python3 >nul 2>&1
if %errorlevel%==0 (
  python3 start.py
  goto :eof
)

echo Python was not found.
echo Install Python 3 from https://www.python.org/downloads/
echo On the installer, tick "Add python.exe to PATH".
echo Then double-click start.bat again.
echo.
pause
