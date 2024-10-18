# WeatherOrNot (?)

Description on the project

## Table of Contents

- [Features](#features)
- [Structure](#structure)
- [Installation](#installation)

## Features
- A user can signup and create an account
- A user can login and log out 
- A user can edit their details
- Generate exercises based on a chosen muscle group
- 

## Structure 
This repo contains two applications:

A frontend React App  
A backend api server built with Flask and links to a PostgreSQL database

## Installation

Instructions for how to install the project:

### 1. Clone the repository
```
# Clone the repository:
git clone https://github.com/Dewi-Afoko/WeatherOrNot.git ProjectName

# Change directory to the cloned repository
cd ProjectName
```

### 2. Setup the Backend
```
# Change directory to the backend folder
cd backend

# Set up the virtual environment
python -m venv backend-venv

# Activate the virtual environment
source backend-venv/bin/activate

# Install dependencies
(backend-venv); pip install -r requirements.txt

# Create a test and development database
(backend-venv); createdb Activity_Tracker_TEST
(backend-venv); createdb Activity_Tracker_TEST_tEst

# Open lib/database_connection.py and change the database names to match the above (if changed)
(backend-venv); open lib/database_connection.py

# Create .env file in backend folder
.env

# Add this to the .env file 
JWT_SECRET= your_secret_key

# Run seed_database to seed the sql files into database 
(backend-venv); python seed_database.py

# Run the tests (with extra logging)
(backend-venv); pytest -sv

# Run the app
(backend-venv); python app.py

# Now visit http://localhost:5000/index in your browser
```

### 3. Setup the frontend

```
# Change directory to the frontend folder
cd ../
cd frontend

# Create an .env file in frontend
.env

# Add this line to your .env file
VITE_BACKEND_URL="http://localhost:5000"

# Install the frontend packages
npm install 

# Run the app
npm run dev

# Run the tests
npm test

# Visit the url http://localhost:5173/ in your browser
```


