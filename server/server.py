from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os
import mysql
import bcrypt
import redisServer


load_dotenv()

app = Flask(__name__)
CORS(app)

port = int(os.getenv("PORT", 3000))
api_key = os.getenv("apikey")
domain = os.getenv("domain")

@app.route('/quotes', methods=['GET'])
def get_quotes():
    sessionToken = request.args.get('sessionToken')
    name = request.args.get('name')

    if not sessionToken or not name:
        return jsonify({'error': "Must be logged in"}), 403

    if not redisServer.checkSessionKey(sessionToken, name):
        return jsonify({'error': "Must be logged in"}), 403

    try:
        response = requests.get('https://api.api-ninjas.com/v1/quotes?category=', headers={'X-Api-Key': api_key})
        response.raise_for_status()
        return jsonify(response.json())
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/savedquotes', methods=['GET'])
def save_quotes():
    sessionToken = request.args.get('sessionToken')
    name = request.args.get('name')

    if not sessionToken or not name:
        return jsonify({'error': "Must be logged in"}), 403
    
    checkIfSessionExists = redisServer.checkSessionKey(sessionToken, name)
    
    if checkIfSessionExists == False:
        return jsonify({'error': "Must be logged in"}), 403
    
    try:
        mysql.test()
        return jsonify({'success': 'true'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500
    
@app.route('/savequote', methods=['POST'])
def save_quote():
    # Check if the request contains JSON data
    if request.is_json:
        # Get the JSON data from the request
        data = request.json

        quote = data["quote"]
        author = data["author"]
        sessionToken = request.args.get('sessionToken')
        name = request.args.get('name')

        if not sessionToken or not name:
            return jsonify({'error': "Must be logged in"}), 403
        
        checkIfSessionExists = redisServer.checkSessionKey(sessionToken, name)

        if checkIfSessionExists == False:
            return jsonify({'error': "Must be logged in"}), 403
        
        sqlResponse = mysql.saveQuote(name, quote, author)

        if sqlResponse[0] == False:
            return jsonify({'error': sqlResponse[1]}), 400
        else:
            return jsonify({"success": True}), 200
    else:
        return jsonify({"error": "Request must contain JSON data"}), 400

@app.route('/signup', methods=['POST'])
def signup():
    # Check if the request contains JSON data
    if request.is_json:
        # Get the JSON data from the request
        data = request.json

        name = data["name"]
        password = data["password"]

        passwordHash = hashPassword(password)
        sql_res_error = mysql.addUser(name, passwordHash)
        
        if sql_res_error[0] != False:
            return jsonify({"error": "Username already taken"}), 400
        
        # Return a response
        return jsonify({"message": "JSON received", "session": sql_res_error[1]}), 200
    else:
        return jsonify({"error": "Request must contain JSON data"}), 400


@app.route('/login', methods=['POST'])
def login():
    # Check if the request contains JSON data
    if request.is_json:
        # Get the JSON data from the request
        data = request.json

        name = data["name"]
        password = data["password"]

        wasSuccessful = mysql.login(name, password)

        if wasSuccessful[0] == True:
            return jsonify({"message": "Success!", "session": wasSuccessful[1]}), 200
        else:
            return jsonify({"error": wasSuccessful[1]}), 400
    else:
        return jsonify({"error": "Request must contain JSON data"}), 400



def hashPassword(password):
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt) 

    return hash



if __name__ == '__main__':
    app.run(port=port)
