from flask import Flask
import os
from flask import request, redirect, session, jsonify,  render_template, flash
import psycopg2
from lib.user_repository import UserRepository
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/users')
def index():
    return jsonify(UserRepository.all()),200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)