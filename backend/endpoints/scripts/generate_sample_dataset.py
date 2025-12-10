import numpy as np
import pandas as pd

# Set a random seed for reproducibility
np.random.seed(42)

# Number of rows in the dataset
num_rows = 3000

# Generate random values for a and b between 0 and 1
a_values = np.random.rand(num_rows)
b_values = np.random.rand(num_rows)

# Calculate y according to the given function
y_values = a_values**2 + 2 * a_values * b_values + b_values**2

# Normalize the values to ensure they are between 0 and 1
a_values /= np.max(a_values)
b_values /= np.max(b_values)
y_values /= np.max(y_values)

# Create a DataFrame with the generated data
df = pd.DataFrame({'a': a_values, 'b': b_values, 'y': y_values})

# Save the DataFrame to a CSV file
df.to_csv('dataset.csv', index=False)