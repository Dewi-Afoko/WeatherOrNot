

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


# Run seed_database to seed the sql files into database 
(backend-venv); python seed_database.py

# Run the tests (with extra logging)
(backend-venv); pytest -sv

# Run the app
(backend-venv); python app.py

# Now visit http://localhost:5001/index in your browser
```