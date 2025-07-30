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
    lang_code = data.get('language', 'en').lower()  # 'en' or 'fr'

    for item in knowledge_base:
        question = item.get(f"question_{lang_code}", '').lower()
        if message == question:
            return jsonify({'response': item.get(f"answer_{lang_code}", "Sorry, I didn't get that.")})

    return jsonify({'response': "Hmm... I'm not sure how to answer that yet. Try asking something else!"})

if __name__ == '__main__':
    app.run(debug=True)
