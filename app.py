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
    user_message = request.json.get('message', '').lower()
    language = request.json.get('language', 'en')  # 'en' or 'fr'

    for item in knowledge_base:
        question = item.get(f'question_{language}', '').lower()
        if question in user_message or user_message in question:
            response = item.get(f'answer_{language}', 'Sorry, I couldn’t find anything.')
            return jsonify({'reply': response})

    # Default fallback if no match found
    fallback = {
        'en': "Sorry, I couldn’t find anything about that. Try asking about beaches, travel plans, or transport tips!",
        'fr': "Désolé, je n'ai pas trouvé d'information. Essaie de poser une question sur les plages, les plans de voyage ou les transports !"
    }
    return jsonify({'reply': fallback.get(language)})

if __name__ == '__main__':
    app.run(debug=True)
