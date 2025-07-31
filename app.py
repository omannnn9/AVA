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

    for qa in knowledge_base:
        if user_message in qa.get('questions', []):
            return jsonify({'response': qa.get('answers', {}).get(language, 'Sorry, I can’t answer that yet.')})

    return jsonify({'response': "I'm not sure, but I'm learning more every day! 🌴"})

if __name__ == '__main__':
    app.run(debug=True)
