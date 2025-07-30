from flask import Flask, render_template, request, jsonify
import json
import random

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
    language = request.json.get('language', 'english')

    if not user_message:
        return jsonify({'response': "Please enter a message."})

    # Get matching answers from the JSON file
    matched_responses = []

    for item in knowledge_base:
        questions = item['questions'].get(language, [])
        if any(q.lower() in user_message for q in questions):
            matched_responses.append(item['answer'].get(language, ''))

    if matched_responses:
        response = random.choice(matched_responses)
    else:
        response = "Sorry, I didn't get that. Can you try asking in a different way?"

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
