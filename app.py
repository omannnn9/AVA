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
    user_message = request.json.get('message', '').lower()
    language = request.json.get('language', 'en')

    for item in knowledge_base:
        if user_message in item['question'].lower():
            return jsonify(reply=item['answer'][language])

    return jsonify(reply="Sorry, I didn't get that. Try asking about places, food, or things to do in Mauritius!")

if __name__ == '__main__':
    app.run(debug=True)
