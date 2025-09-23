@echo off
echo Royal Enfield Bike Price Prediction - Project Runner
echo =====================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.7+ and try again
    pause
    exit /b 1
)

REM Check if pip is installed
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: pip is not installed
    echo Please install pip and try again
    pause
    exit /b 1
)

echo 1. Installing required packages...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error: Failed to install required packages
    pause
    exit /b 1
)

echo.
echo 2. Training the model...
python train_model.py
if %errorlevel% neq 0 (
    echo Error: Model training failed
    pause
    exit /b 1
)

echo.
echo 3. Starting Streamlit app...
echo Open your browser and go to http://localhost:8501
streamlit run app.py

pause