from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load the bilingual knowledge base
with open('ava_knowledge_base.json', 'r', encoding='utf-8') as f:
    knowledge_base = json.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '').lower()
    language = data.get('language', 'en')

    # Match user's message with knowledge base
    for item in knowledge_base:
        if user_message in item['question'].lower():
            return jsonify({'answer': item['answer_' + language]})

    # Default fallback response
    fallback = {
        'en': "Sorry, I didn't understand that. Try asking something else about Mauritius 🇲🇺",
        'fr': "Désolé, je n'ai pas compris. Essayez de demander autre chose sur l'île Maurice 🇲🇺"
    }
    return jsonify({'answer': fallback[language]})

if __name__ == '__main__':
    app.run(debug=True)
