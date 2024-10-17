

```shell
# Set up the virtual environment
; python -m venv backend-venv

# Activate the virtual environment
; source backend-venv/bin/activate

# Install dependencies
(backend-venv); pip install -r requirements.txt

# Create a test and development database
(backend-venv); createdb Activity_Tracker_TEST
(backend-venv); createdb Activity_Tracker_TEST_tEst

# Open lib/database_connection.py and change the database names
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
#create .env file in frontend 

# copy paste this into the .env file in the frontend : VITE_BACKEND_URL="http://localhost:5000"

