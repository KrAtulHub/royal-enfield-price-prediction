# Royal Enfield Bike Price Prediction - Project Summary

This document summarizes all the files created for the Royal Enfield Bike Price Prediction project.

## 📁 Files Created

### 1. Dataset
- **`royal_enfield_data.csv`** - Sample dataset with 30 rows of Royal Enfield bike data including:
  - Model (Classic 350, Bullet 350, Himalayan, Meteor 350, Hunter 350)
  - Year of Manufacture
  - Present Price (in lakhs)
  - Kms Driven
  - Owner (first/second/third owner)
  - Transmission (Manual)
  - Selling Price (target variable)

### 2. Model Training Scripts
- **`train_model.py`** - Python script for training multiple regression models:
  - Linear Regression
  - Random Forest
  - Gradient Boosting
  - Saves the best model as `royal_enfield_model.pkl`
  - Saves encoders for categorical variables

- **`royal_enfield_price_prediction.ipynb`** - Jupyter Notebook version with:
  - Detailed exploratory data analysis
  - Visualizations
  - Model training and evaluation
  - Feature importance analysis

### 3. Deployment Application
- **`app.py`** - Streamlit web application that:
  - Loads the trained model
  - Provides a clean UI for user inputs
  - Shows predicted resale price
  - Displays pros and cons of each bike model
  - Provides depreciation insights

### 4. Analysis and Visualization
- **`depreciation_analysis.py`** - Script to analyze depreciation patterns:
  - Depreciation by bike age
  - Depreciation by model
  - Generates `depreciation_analysis.png`

### 5. Documentation and Setup
- **`requirements.txt`** - Lists all required Python packages:
  - streamlit
  - pandas
  - scikit-learn
  - joblib
  - matplotlib
  - seaborn
  - numpy

- **`README.md`** - Comprehensive guide with:
  - Project overview
  - Installation instructions
  - Usage guidelines
  - Technical details

- **`PROJECT_SUMMARY.md`** - This file

### 6. Generated Model Files
- **`royal_enfield_model.pkl`** - Best trained model (Linear Regression)
- **`le_model.pkl`** - Label encoder for bike models
- **`le_owner.pkl`** - Label encoder for owner types
- **`le_transmission.pkl`** - Label encoder for transmission types
- **`depreciation_analysis.png`** - Visualization of depreciation patterns

## ▶️ How to Run the Project

1. **Install dependencies**:
   ```
   pip install -r requirements.txt
   ```

2. **Train the model** (if not already done):
   ```
   python train_model.py
   ```

3. **Run the Streamlit app**:
   ```
   streamlit run app.py
   ```

4. **(Optional) Run analysis**:
   ```
   python depreciation_analysis.py
   ```

## 🎯 Features Implemented

- ✅ Complete end-to-end machine learning pipeline
- ✅ Multiple regression models for comparison
- ✅ Feature engineering (bike age calculation)
- ✅ Categorical variable encoding
- ✅ Model evaluation with R², RMSE, MAE
- ✅ Web-based deployment with Streamlit
- ✅ Interactive UI with bike model information
- ✅ Pros and cons display for each model
- ✅ Depreciation insights
- ✅ Data visualization
- ✅ Jupyter Notebook for analysis

## <|fim_pad|>cfuture Enhancements

- Add bike image upload option for condition analysis (CNN)
- Implement more advanced models
- Add more features to the dataset
- Create API endpoints for integration