from flask import Flask, request, jsonify
import os
import pandas as pd
from langchain_experimental.agents import create_csv_agent
from langchain.llms import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Set up OpenAI API key
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables.")

# Global variables to store uploaded file and agent
uploaded_file_path = None
agent = None

# Endpoint for file upload
@app.route('/upload', methods=['POST'])
def upload_file():
    global uploaded_file_path, agent
    
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Save the file
    file_ext = file.filename.rsplit('.', 1)[1].lower()
    uploaded_file_path = f"/tmp/uploaded_file.{file_ext}"
    file.save(uploaded_file_path)
    
    # If Excel file, convert to CSV
    if file_ext == 'xlsx':
        data = pd.read_excel(uploaded_file_path, engine='openpyxl')
        uploaded_file_path = "/tmp/uploaded_file.csv"
        data.to_csv(uploaded_file_path, index=False)
    
    # Create the LangChain CSV agent
    agent = create_csv_agent(OpenAI(temperature=0, openai_api_key=openai_api_key), uploaded_file_path, verbose=True, allow_dangerous_code=True)
    
    return jsonify({"message": "File uploaded and agent created successfully."}), 200

# Endpoint for submitting a prompt
@app.route('/submit-prompt', methods=['POST'])
def submit_prompt():
    global agent
    
    if not agent:
        return jsonify({"error": "No file uploaded yet."}), 400
    
    prompt = request.json.get('prompt')
    if not prompt:
        return jsonify({"error": "Prompt is required."}), 400
    
    # Use the LangChain agent to analyze the prompt
    try:
        response = agent.run(prompt)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
