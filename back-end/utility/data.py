import pandas as pd

# Utility function to load data from CSVs with optional feature selection and cleaning

def LoadDataTable(path, features=[]):
    try:
        # Attempt to load the data from the provided path
        # Specifying `dtype` as `str` for a specific column can be added if needed for large datasets
        # `low_memory=False` ensures that pandas reads the entire file into memory to optimize types.
        data = pd.read_csv(path, dtype={"column_name": str}, low_memory=False)

    except FileNotFoundError:
        # Raise a specific error if the file is not found
        raise ValueError(f"File not found: {path}")
    except Exception as e:
        # Catch other exceptions, such as issues with file
        raise ValueError(f"Error reading data: {str(e)}")

    # Drop duplicates and rows with missing values (NaN)
    data = data.drop_duplicates().dropna()

    # Clean column names by stripping any extra whitespace
    data.columns = data.columns.str.strip()

    # Strip whitespace from string values in the dataframe
    data = data.apply(lambda x: x.str.strip() if x.dtype == "object" else x)

    # If specific features (columns) are requested, filter the dataframe
    if features:
        data = data[features]
    return data
