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

    for item in knowledge_base:
        if message in item.get('question', '').lower():
            return jsonify({'response': item.get('answer_' + language, "Sorry, I didn't get that.")})

    return jsonify({'response': "Hmm... I'm not sure how to answer that yet. Try asking something else!"})

if __name__ == '__main__':
    app.run(debug=True)
