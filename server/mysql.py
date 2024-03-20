import pymysql
from datetime import date
from dotenv import load_dotenv
import os
import bcrypt

load_dotenv()
timeout = 10

def get_connection():
    return pymysql.connect(
        charset="utf8mb4",
        connect_timeout=timeout,
        cursorclass=pymysql.cursors.DictCursor,
        db=os.getenv("dbName"),
        host=os.getenv("dbHost"),
        password=os.getenv("dbPassword"),
        read_timeout=timeout,
        port=int(os.getenv("dbPort")),
        user=os.getenv("dbUser"),
        write_timeout=timeout,
    )

def addUser(name, hashedPassword):
    try:
        today = date.today()
        connection = get_connection()
        cursor = connection.cursor()
        # Check if user exists
        check_query = "SELECT * FROM users WHERE name = %s"
        check_value = (name)
        cursor.execute(check_query, check_value)

        results = cursor.fetchall()
        if len(results) > 0:
            return "Username already taken"
        
        # Add user
        insert_query = (
            """
            INSERT INTO users (name, password, created_at)
            VALUES (%s, %s, %s)
            """
        )
        values = (name, hashedPassword, today)

        cursor.execute(insert_query, values)

        connection.commit()
        return False
    except Exception as e:
        # Handle exceptions here
        print("An error occurred:", e)
        return True
    finally:
        if 'connection' in locals():
            connection.close()


def login(name, password):
    try:
        connection = get_connection()
        cursor = connection.cursor()
        query = "SELECT * FROM users WHERE name = %s"
        value = (name)
        cursor.execute(query, value)

        results = cursor.fetchall()
        if len(results) > 0:
            user = results[0]
            passwordFromDatabase = user['password'].encode('utf-8')
            password_bytes = password.encode('utf-8')

            iscorrectPassword = bcrypt.checkpw(password_bytes, passwordFromDatabase)
            if iscorrectPassword:
                return [True]
        else:
            return [False, "Incorrect Login Details"]

    except Exception as e:
        # Handle exceptions here
        print("An error occurred in login:", e)
        return [False, "Server Error"]
    finally:
        if 'connection' in locals():
            connection.close()
