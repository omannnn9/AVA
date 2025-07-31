from flask import Flask, render_template, request, jsonify
import json
import time

app = Flask(__name__)

with open('ava_knowledge_base.json', 'r', encoding='utf-8') as f:
    knowledge_base = json.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '').lower()
    language = request.json.get('language', 'english').lower()

    # Simulate typing delay
    time.sleep(1.5)

    for entry in knowledge_base:
        if entry["question"].lower() in user_message and entry["language"].lower() == language:
            return jsonify({"answer": entry["answer"]})

    return jsonify({"answer": "Sorry, I couldn't find an answer to that. Try asking something else!"})

if __name__ == '__main__':
    app.run(debug=True)
