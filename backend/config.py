import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

# OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
