# Structured Data Analyzer App

## Overview

The Structured Data Analyzer is a web application that allows users to upload CSV or Excel files, submit questions about the data, and receive detailed analysis and answers using LangChain and OpenAI's GPT model. The application includes both a frontend built with Next.js and a backend built with Flask.

## Prerequisites

Before running the application, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Python](https://www.python.org/) (v3.7 or higher)
- [pip](https://pip.pypa.io/en/stable/)
- [Git](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd structured-data-analyzer
```

### 2. Setting Up the Backend

#### Install Python Dependencies

Navigate to the `my-app` directory (which is your project root) and install the required Python packages:

```bash
pip install -r requirements.txt
```

#### Create a `.env` File

Create a `.env` file in the `my-app` directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=your-openai-api-key
```

### 3. Setting Up the Frontend

#### Install Node.js Dependencies

Navigate to the `my-app` directory (where `package.json` is located) and install the necessary Node.js packages:

```bash
npm install
```

### 4. Running the Application

#### Run the Backend (Flask)

To start the Flask backend, run:

```bash
python app.py
```

By default, the backend will run on `http://localhost:5000`.

#### Run the Frontend (Next.js)

To start the Next.js frontend, run:

```bash
npm run dev
```

By default, the frontend will run on `http://localhost:3000`.

### 5. Using the Application

1. **Access the Application**:

   - Open your web browser and go to `http://localhost:3000`.

2. **Upload a File**:

   - On the main page, upload a CSV or Excel file by clicking on the upload button or dragging and dropping the file.

3. **Submit a Question**:

   - After the file is uploaded, type a question about the data in the input field and click "Submit".

4. **View Results**:
   - The application will process the question and display the results below the input field.

### Project Structure

- **/components**: Contains the React components used in the frontend.
- **/pages**: Contains the Next.js pages.
- **/public**: Static files and assets.
- **/app.py**: The Flask backend application file.
- **/.env**: Environment variables for the backend (not included in version control).
- **/package.json**: Node.js dependencies and scripts for the frontend.
- **/requirements.txt**: Python dependencies for the backend.

### Environment Variables

- **OPENAI_API_KEY**: Your OpenAI API key, required to interact with the GPT model.

### Troubleshooting

- **CORS Issues**: If you encounter CORS errors, ensure that the Flask backend has CORS enabled as shown in the `app.py` setup.
- **API Key Issues**: Ensure your `.env` file is correctly configured and the `OPENAI_API_KEY` is valid.
- **Port Conflicts**: Ensure that no other applications are running on ports `3000` (frontend) and `5000` (backend).

### Additional Notes

- **Deployment**: For production deployment, ensure to build the frontend using `npm run build` and consider using a production-ready server for Flask like Gunicorn.
- **Security**: Never expose your `.env` file or API keys in public repositories. Always add `.env` to your `.gitignore` file.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

### License

This project is licensed under the MIT License - see the LICENSE file for details.
