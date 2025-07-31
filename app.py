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
    language = data.get('language', 'english')

    responses = knowledge_base.get(language, [])
    reply = "Sorry, I don’t understand. Try asking something else."
    for item in responses:
        if item['question'].lower() in message:
            reply = item['answer']
            break
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)
