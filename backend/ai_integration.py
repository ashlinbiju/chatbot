import openai
from config import OPENAI_API_KEY

# Set up OpenAI API key
openai.api_key = OPENAI_API_KEY

def generate_response(user_input):
    """
    Sends the user's input to OpenAI and gets a response
    """
    try:
        response = openai.Completion.create(
            model="text-davinci-003",  # Change the model based on your need
            prompt=user_input,
            max_tokens=150,
            temperature=0.7
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error: {str(e)}"
