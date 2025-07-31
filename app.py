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
    message = data.get('message', '').lower()
    language = data.get('language', 'en')

    response = "Sorry, I didn't understand that."

    for pair in knowledge_base.get(language, []):
        if pair['question'].lower() in message:
            response = pair['answer']
            break

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
