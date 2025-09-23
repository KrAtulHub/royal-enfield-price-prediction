# Royal Enfield Bike Price Prediction Model Training

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import warnings
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
from tabulate import tabulate   # for pretty console tables

warnings.filterwarnings('ignore')

# -------------------------------
# 1. Load Data
# -------------------------------
df = pd.read_csv("royal_enfield_data.csv")

print("\n📊 Dataset Overview")
print("=" * 50)
print("Shape:", df.shape)
print("\nFirst 5 rows:\n", df.head())

# -------------------------------
# 2. Feature Engineering
# -------------------------------
current_year = 2025
df["Bike_Age"] = current_year - df["Year"]

# Label encoding
le_model = LabelEncoder()
le_owner = LabelEncoder()
le_transmission = LabelEncoder()

df["Model_encoded"] = le_model.fit_transform(df["Model"])
df["Owner_encoded"] = le_owner.fit_transform(df["Owner"])
df["Transmission_encoded"] = le_transmission.fit_transform(df["Transmission"])

features = ["Model_encoded", "Bike_Age", "Kms_Driven", "Owner_encoded", "Transmission_encoded", "Present_Price"]
X = df[features]
y = df["Selling_Price"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("\n📌 Training Samples:", X_train.shape[0])
print("📌 Testing Samples :", X_test.shape[0])

# -------------------------------
# 3. Model Training & Evaluation
# -------------------------------
models = {
    "Linear Regression": LinearRegression(),
    "Random Forest": RandomForestRegressor(n_estimators=200, random_state=42),
    "Gradient Boosting": GradientBoostingRegressor(n_estimators=200, random_state=42),
}

results = []

def evaluate_model(name, model):
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    results.append([name, r2, rmse, mae, model])
    return r2

print("\n⚡ Training Models...")
for name, model in models.items():
    evaluate_model(name, model)

# Show summary
results_df = pd.DataFrame(results, columns=["Model", "R²", "RMSE", "MAE", "Object"])
print("\n📊 Model Performance")
print(tabulate(results_df.drop("Object", axis=1), headers="keys", tablefmt="fancy_grid", showindex=False))

# -------------------------------
# 4. Select Best Model
# -------------------------------
best_row = results_df.iloc[results_df["R²"].idxmax()]
best_model, best_name = best_row["Object"], best_row["Model"]

print(f"\n🏆 Best Model: {best_name} (R² = {best_row['R²']:.4f})")

# Save model + encoders
joblib.dump(best_model, "royal_enfield_model.pkl")
joblib.dump(le_model, "le_model.pkl")
joblib.dump(le_owner, "le_owner.pkl")
joblib.dump(le_transmission, "le_transmission.pkl")

print("✅ Model & Encoders Saved!")

# -------------------------------
# 5. Feature Importance (Tree models only)
# -------------------------------
if hasattr(best_model, "feature_importances_"):
    importance = pd.DataFrame({
        "Feature": features,
        "Importance": best_model.feature_importances_
    }).sort_values("Importance", ascending=False)

    plt.figure(figsize=(8, 5))
    sns.barplot(data=importance, x="Importance", y="Feature", palette="viridis")
    plt.title(f"Feature Importance - {best_name}")
    plt.tight_layout()
    plt.show()   # SHOW instead of only save

# -------------------------------
# 6. Actual vs Predicted Plot
# -------------------------------
plt.figure(figsize=(8, 6))
y_pred_best = best_model.predict(X_test)
plt.scatter(y_test, y_pred_best, alpha=0.7, edgecolor="k")
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], "r--")
plt.xlabel("Actual Price (Lakhs)")
plt.ylabel("Predicted Price (Lakhs)")
plt.title(f"Actual vs Predicted - {best_name}")
plt.tight_layout()
plt.show()