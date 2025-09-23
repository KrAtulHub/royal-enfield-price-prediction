import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load the dataset
df = pd.read_csv("royal_enfield_data.csv")

# Calculate depreciation percentage
df['Depreciation_%'] = ((df['Present_Price'] - df['Selling_Price']) / df['Present_Price']) * 100

# Calculate bike age
current_year = 2023
df['Bike_Age'] = current_year - df['Year']

# Set up the plotting style
plt.style.use('seaborn-v0_8')
fig, axes = plt.subplots(2, 1, figsize=(12, 10))

# 1. Depreciation by Age
ax1 = axes[0]
sns.boxplot(data=df, x='Bike_Age', y='Depreciation_%', ax=ax1)
ax1.set_title('Depreciation Percentage by Bike Age', fontsize=14, fontweight='bold')
ax1.set_xlabel('Bike Age (Years)', fontsize=12)
ax1.set_ylabel('Depreciation (%)', fontsize=12)

# 2. Depreciation by Model
ax2 = axes[1]
sns.boxplot(data=df, x='Model', y='Depreciation_%', ax=ax2)
ax2.set_title('Depreciation Percentage by Model', fontsize=14, fontweight='bold')
ax2.set_xlabel('Model', fontsize=12)
ax2.set_ylabel('Depreciation (%)', fontsize=12)
ax2.tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.show()

# Print summary statistics
print("Depreciation Summary by Model:")
print("=" * 40)
depreciation_by_model = df.groupby('Model')['Depreciation_%'].agg(['mean', 'median', 'std'])
depreciation_by_model.columns = ['Mean_Depreciation_%', 'Median_Depreciation_%', 'Std_Depreciation_%']
print(depreciation_by_model.round(2))

# Save the plot
fig.savefig('depreciation_analysis.png', dpi=300, bbox_inches='tight')
print("\nPlot saved as 'depreciation_analysis.png'")