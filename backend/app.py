from flask import Flask
import os
from flask import request, redirect, session, render_template, flash
import psycopg2
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)