@echo off
setlocal EnableDelayedExpansion

echo ============================================================
echo NEWS AUTHENTICITY CHECKER - DEMO
echo ============================================================
echo.

REM Set error codes
set ERROR_PYTHON_NOT_FOUND=1
set ERROR_BACKEND_NOT_FOUND=2
set ERROR_PIP_FAILED=3
set ERROR_VENV_FAILED=4

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ and try again
    pause
    exit /b %ERROR_PYTHON_NOT_FOUND%
)

REM Check Python version
for /f "tokens=2 delims=." %%I in ('python -c "import sys; print(sys.version.split()[0])"') do (
    set PYTHON_VERSION=%%I
)
if %PYTHON_VERSION% LSS 8 (
    echo ERROR: Python 3.8 or higher is required
    echo Current version: %PYTHON_VERSION%
    pause
    exit /b %ERROR_PYTHON_NOT_FOUND%
)

REM Check if backend directory exists
if not exist "backend" (
    echo ERROR: Backend directory not found
    echo Please ensure the backend folder exists
    pause
    exit /b %ERROR_BACKEND_NOT_FOUND%
)

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b %ERROR_VENV_FAILED%
    )
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install/upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install psutil first (required for process management)
echo Installing psutil...
pip install psutil

REM Install requirements
echo Installing dependencies...
pip install -r backend/requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b %ERROR_PIP_FAILED%
)

REM Create logs directory if it doesn't exist
if not exist "logs" mkdir logs

REM Start the demo
echo.
echo Starting News Authenticity Checker Demo...
echo Logs will be written to .\logs\demo.log
echo Press Ctrl+C to stop the demo
echo.

python start_demo.py

REM Deactivate virtual environment
deactivate

echo.
echo Demo stopped. Press any key to exit...
pause >nul
