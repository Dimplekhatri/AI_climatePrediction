Got it! Here's the updated README file reflecting the use of ReactJS for the frontend and Node.js with Express for the backend:

---

# AI Climate Prediction

This repository contains an AI-based solution for climate prediction using machine learning models. It integrates a ReactJS frontend, a Node.js backend with Express, and a Flask API to provide an interactive climate prediction tool.

## Project Structure

The project is organized into the following folders:

- **`frontend/`**: Contains the ReactJS code for the user interface of the climate prediction system. This includes components, routing, and styling.
  
- **`backend/`**: Contains the Node.js and Express code for the server-side functionalities, such as data processing, handling user requests, and interacting with the Flask API.

- **`flaskapi/`**: Contains the Flask API that serves the machine learning model. This API is used by the backend to make predictions based on the trained model.

- **`notebook/`**: Contains the Jupyter notebooks with the code for training the machine learning model and the dataset used. It includes the steps for data preprocessing, training the model, and evaluating its performance.

## Libraries & Tools Used

The following libraries and tools were used in this project:

- **ReactJS**: For building the frontend user interface.
- **Node.js**: Server-side runtime environment.
- **Express**: Web framework for Node.js, used to create the backend API.
- **TensorFlow**: For building and training the machine learning model.
- **Intel Optimized Libraries**: To accelerate the performance of machine learning algorithms.
- **NumPy**: For numerical computations and handling data arrays.
- **Pandas**: For data manipulation and preprocessing.
- **Flask**: For creating the API to serve the trained machine learning model.

## How to Use

### Prerequisites

Ensure you have the following software installed:

- **Node.js** and **npm** (Node Package Manager)
- **Python** (preferably 3.7 or higher)
- **pip** (Python package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_name>
   ```

2. **Frontend Setup** (ReactJS):
   
   Navigate to the `frontend/` folder and install the required dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup** (Node.js with Express):

   Navigate to the `backend/` folder and install the required dependencies:

   ```bash
   cd backend
   npm install
   ```

4. **Flask API Setup**:

   Navigate to the `flaskapi/` folder and install Python dependencies:

   ```bash
   cd flaskapi
   pip install numpy pandas flask flask-cors tensorflow 
   ```

5. **Start the Backend Server**:

   From the `backend/` folder, run the following command to start the Node.js server:

   ```bash
   npm start
   ```

   This will start the backend server on `http://localhost:5000`.

6. **Start the Frontend Development Server**:

   In the `frontend/` folder, run the following to start the React development server:

   ```bash
   npm start
   ```

   This will start the frontend on `http://localhost:3000`.

7. **Training the Model**:

   To train the machine learning model, navigate to the `notebook/` folder and run the Jupyter notebook:

   ```bash
   jupyter notebook
   ```

   Follow the instructions in the notebook for data preprocessing, training, and saving the model.

8. **Testing the Model**:

   Once the model is trained, the Flask API will serve it. The Node.js backend will interact with the Flask API to get predictions. Use the ReactJS frontend to input data and receive climate predictions.

## Contributing

Feel free to fork the repository, create a branch, and submit a pull request with your improvements or fixes. Please ensure that any changes made follow best practices and include relevant documentation.
