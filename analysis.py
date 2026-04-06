import pandas as pd

data = pd.read_csv("Student_Performance_Dataset.csv")

# Show dataset
print(data)

# Total students
print("Total Students:", len(data))

# Average scores
print("Average Math Score:", data["Math_Score"].mean())
print("Average English Score:", data["English_Score"].mean())

# Performance count
print(data["Performance_Level"].value_counts())