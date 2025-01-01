from flask import Flask, request, jsonify
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)

# Create a ChatterBot instance
chatbot = ChatBot(
    'Mental Health Bot', 
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        'chatterbot.logic.BestMatch',
        'chatterbot.logic.MathematicalEvaluation',
        'chatterbot.logic.BestMatch'
    ],
    database_uri='sqlite:///database.db'  # Use SQLite for storing conversations
)

# Train the chatbot on some predefined corpus (English corpus)
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train("chatterbot.corpus.english")

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('prompt')  # Get the user input from the frontend
    
    # Get the response from ChatterBot
    response_text = chatbot.get_response(user_input)

    return jsonify({"response": str(response_text)})

if __name__ == '__main__':
    app.run(debug=True)
