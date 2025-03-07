from flask import Flask, jsonify
import random

app = Flask(__name__)

@app.route('/api/analytics')
def get_analytics():
    # Generate mock data for each section
    data = {
        'cybersecurity': [random.randint(50, 100) for _ in range(6)],
        'aiEngineering': [random.randint(50, 100) for _ in range(6)],
        'dataScience': [random.randint(50, 100) for _ in range(6)],
        'blockchain': [random.randint(50, 100) for _ in range(6)]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
