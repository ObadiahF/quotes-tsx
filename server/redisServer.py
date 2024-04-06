import redis
import string
import random
from dotenv import load_dotenv
import os

load_dotenv()
redis_uri = os.getenv("reddisUri")

def setSessionKey(userName):
    redis_client = redis.from_url(redis_uri)
    sessionId = generateId(100)
    redis_client.set(userName, sessionId)
    key = redis_client.get(userName).decode('utf-8')

    return key

def checkSessionKey(sessionkeyFromRequest, userName):
    try:
        redis_client = redis.from_url(redis_uri)
        key = redis_client.get(userName).decode('utf-8')
        if key == sessionkeyFromRequest:
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False

def generateId(size, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))
