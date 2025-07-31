from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

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

    response = knowledge_base.get(language, {}).get(user_message, "Sorry, I don’t understand that yet.")
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
