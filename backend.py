from flask import Flask, request, jsonify
from google.colab import userdata
from groq import Groq

app = Flask(__name__)

# Initialize Groq client
client = Groq(api_key=userdata.get("GROQ_API_KEY"))

@app.route('/chatbot', methods=['POST'])
def chatbot():
    # Retrieve message from the frontend
    user_message = request.json['message']

    # Call Groq API to get chat completion
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": user_message}],
        model="llama3-70b-8192",
    )

    # Extract and return the response
    bot_response = chat_completion.choices[0].message.content
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run()
