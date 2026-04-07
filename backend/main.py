import requests
import json

API_KEY = "4Q62SBA-3664E06-JKN20FZ-DMJGVQC"
WORKSPACE_SLUG = "farmaing assistant"  
BASE_URL = "http://localhost:3131/api/v1" 

def query_farming_assistant(prompt):
    url = f"{BASE_URL}/workspace/{WORKSPACE_SLUG}/chat"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    payload = {
        "message": prompt,
        "mode": "query" 
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status() 
        
        data = response.json()
        return data.get("textResponse", "No response received.")
        
    except requests.exceptions.RequestException as e:
        return f"Error connecting to AnythingLLM: {e}"

user_question = "Based on my CSV, what is the ideal pH for the north field?"
answer = query_farming_assistant(user_question)
print(f"AI Assistant: {answer}")