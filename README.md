# Royal Enfield Bike Price Prediction

This project predicts the resale price of Royal Enfield motorcycles using machine learning algorithms. It includes a dataset, model training script, and both a Streamlit web application and a standalone HTML/CSS/JS web application for deployment.

## 📁 Project Structure

- `royal_enfield_data.csv` - Sample dataset with Royal Enfield bike information
- `train_model.py` - Script to train and save the machine learning model
- `royal_enfield_price_prediction.ipynb` - Jupyter Notebook with detailed analysis
- `app.py` - Streamlit web application for price prediction
- `depreciation_analysis.py` - Script to analyze depreciation patterns
- `requirements.txt` - List of required Python packages
- `index.html` - HTML frontend for web-based application
- `style.css` - Styling for the web application
- `script.js` - JavaScript functionality for the web application
- `server.js` - Node.js server to serve the web application
- `package.json` - Node.js dependencies and scripts
- `README.md` - This file
- `PROJECT_SUMMARY.md` - Detailed summary of all files
- `PROJECT_STRUCTURE.md` - Visual representation of project structure
- `test_project.py` - Script to verify all components

## 🚀 Getting Started

### Prerequisites

Make sure you have Python 3.7+ and Node.js 14+ installed on your system.

### Option 1: Streamlit Application

1. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Train the model:
   ```
   python train_model.py
   ```

3. Run the Streamlit app:
   ```
   streamlit run app.py
   ```

### Option 2: HTML/CSS/JS Web Application

1. Install Node.js dependencies:
   ```
   npm install
   ```

2. Start the web server:
   ```
   npm start
   ```

3. Open your browser and go to http://localhost:3000

## 📊 Features

- **Multiple Models**: Compares Linear Regression, Random Forest, and Gradient Boosting
- **Feature Engineering**: Calculates bike age and encodes categorical variables
- **Model Evaluation**: Uses R² Score, RMSE, and MAE for performance metrics
- **Streamlit UI**: Clean, responsive web interface
- **HTML/CSS/JS UI**: Modern, standalone web application
- **Bike Information**: Shows pros and cons for each Royal Enfield model
- **Insights**: Provides depreciation and value retention information
- **Jupyter Notebook**: Detailed analysis and visualization
- **Depreciation Analysis**: Patterns by age and model

## 🏍️ Supported Models

- Classic 350
- Bullet 350
- Himalayan
- Meteor 350
- Hunter 350
- Continental GT 650
- INT 650
- Scram 411
- Guerrilla 450
- Himalayan 450
- Super Meteor 650
- Bullet 650
- Goan Classic 350
- Bear 650
- Shotgun 650
- Scrambler 450
- Himalayan 750
- Flying Flea
- Interceptor 650

## 📈 Model Performance

The application will display which model performed best during training based on R² Score.

| Model | R² Score | RMSE | MAE |
|-------|----------|------|-----|
| Linear Regression | 0.9912 | 0.0740 | 0.0634 |
| Random Forest | 0.9496 | 0.1773 | 0.1446 |
| Gradient Boosting | 0.9658 | 0.1461 | 0.1238 |

## 🛠️ Technologies Used

- Python
- Pandas & NumPy for data manipulation
- Scikit-learn for machine learning
- Streamlit for web application
- HTML, CSS, JavaScript for standalone web interface
- Node.js & Express for web server
- Matplotlib & Seaborn for visualization
- Joblib for model persistence

## 📋 Additional Scripts

- `depreciation_analysis.py` - Analyze and visualize depreciation patterns
- `test_project.py` - Verify all components work correctly
- `royal_enfield_price_prediction.ipynb` - Jupyter Notebook with detailed analysis

## 🤝 Contributing

Feel free to fork this repository and contribute by submitting a pull request.

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.