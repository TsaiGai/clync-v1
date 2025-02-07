from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

# Function to fetch data from the database
def get_apartments():
    conn = sqlite3.connect('../database/apartments.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM apartments')
    apartments = cursor.fetchall()
    conn.close()
    return apartments

@app.route('/apartments', methods=['GET'])
def apartments(): 
    apartments = get_apartments()
    # Convert data to a list of dictionaries for JSON response
    apartments_list = []
    for apartment in apartments:
        apartments_list.append({
            "id": apartment[0],
            "apartment_name": apartment[1],
            "bedrooms": apartment[2],
            "floorplan": apartment[3],
            "unit_type": apartment[4]
        })
    return jsonify(apartments_list)

if __name__ == '__main__':
    app.run(debug=True)