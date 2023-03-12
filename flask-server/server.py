from flask import Flask, request, jsonify
from flask_cors import CORS
import os

currentdirectory = os.path.dirname(os.path.abspath(__file__))


app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)

@app.route("/greeting")
def default():
    return {"message" : "Hello from the server!"}

@app.route("/process", methods=["POST"])
def processVideo():
    url = request.json.get('link')
    print('bruh')
    print(url)
    return {"link": url}
if __name__ == "__main__":
    app.run(debug=True)