import sqlite3
import os

# Connect to SQLite database (or create it)
conn = sqlite3.connect('../ClyncWeb/database/apartments.db')
cursor = conn.cursor()

# Create the apartments table
cursor.execute('''
CREATE TABLE IF NOT EXISTS apartments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    apartment_name TEXT NOT NULL,
    bedrooms INTEGER NOT NULL,
    floorplan TEXT NOT NULL,
    unit_type TEXT NOT NULL
)
''')

# Commit changes
conn.commit()

# Manually insert data
apartments = [
    ("Vida Apartments", 1, "O10", "Higher Floor Units"),
    ("Forlor Apartments", 1, "12B", "Lofted Units"),
    ("Groove on Grove", 1, "A22B3", "South Facing"),
    ("Tilted Towers Apartments", 1, "Salty S4", "West Facing")
]

# Insert each apartment into the database
for apartment in apartments:
    cursor.execute('''
    INSERT INTO apartments (apartment_name, bedrooms, floorplan, unit_type)
    VALUES (?, ?, ?, ?)
    ''', apartment)

# Commit and close
conn.commit()
conn.close()

# db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../database/apartments.db"))
# print(f"Database Path: {db_path}")  # Debugging: Print the path being used

# # Try opening the database
# try:
#     conn = sqlite3.connect(db_path)
#     print("Database connection successful!")
# except sqlite3.OperationalError as e:
#     print(f"Error opening database: {e}")