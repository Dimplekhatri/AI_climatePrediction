# import numpy as np
# from flask import Flask, request, jsonify
# from tensorflow.keras.models import load_model
# import tensorflow as tf
# from flask_cors import CORS  # Import CORS

# app = Flask(__name__)

# # Enable CORS for all routes (allows all origins)
# CORS(app)

# # Load the trained model
# model = load_model('model/intel_climate_event_classifier.h5', 
#                    custom_objects={'mse': tf.keras.metrics.MeanSquaredError()})

# # Compile the model (if needed)
# model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json(force=True)
#         features = data.get('features')
        

#         # Ensure the input contains exactly 8 features (weather features)
#         if not isinstance(features, list) or len(features) != 8:
#             return jsonify({'error': 'Input features must be an array of 8 values'}), 400

#         # Extract the weather features
#         latitude, longitude, windSpeed, temperature, humidity, pressure, dewPoint, precipProbability = features

#         # Dummy previous data (For demonstration, this would be replaced with actual data)
#         previous_data = {
#             'windSpeed': 5,  # Previous wind speed
#             'temperature': 22,  # Previous temperature
#             'precipProbability': 0.2  # Previous precipitation probability
#         }

#         # Calculate the changes
#         WS2M_Change = windSpeed - previous_data['windSpeed']
#         T2M_Change = temperature - previous_data['temperature']
#         Precip_Change = precipProbability - previous_data['precipProbability']

#         # Preprocess the features (including the changes)
#         processed_features = np.array([WS2M_Change, T2M_Change, Precip_Change]).reshape(1, -1)

#         # Make the prediction using the model
#         raw_prediction = model.predict(processed_features)
#         predicted_class = np.argmax(raw_prediction, axis=1)[0]

#         # Return the predicted event class
#         return jsonify({'predicted_class': int(predicted_class)})

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import tensorflow as tf
from flask_cors import CORS  # Import CORS
import os

app = Flask(__name__)

# Enable CORS for all routes (allows all origins)
CORS(app)

# Load the trained model
model = load_model('model/climate_event_model.h5', 
                   custom_objects={'mse': tf.keras.metrics.MeanSquaredError()})

# Compile the model (if needed)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# File path for storing training data
data_file = 'training_data.csv'

# Check if the file exists, otherwise create it with column names
if not os.path.exists(data_file):
    columns = ['latitude', 'longitude', 'windSpeed', 'temperature', 'humidity', 'pressure', 'dewPoint', 'precipProbability', 'predicted_class']
    df = pd.DataFrame(columns=columns)
    df.to_csv(data_file, index=False)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        features = data.get('features')

        # Ensure the input contains exactly 8 features (weather features)
        if not isinstance(features, list) or len(features) != 8:
            return jsonify({'error': 'Input features must be an array of 8 values'}), 400

        # Extract the weather features
        latitude, longitude, windSpeed, temperature, humidity, pressure, dewPoint, precipProbability = features

        # Dummy previous data (For demonstration, this would be replaced with actual data)
        previous_data = {
            'windSpeed': 5,  # Previous wind speed
            'temperature': 22,  # Previous temperature
            'precipProbability': 0.2  # Previous precipitation probability
        }

        # Calculate the changes
        WS2M_Change = windSpeed - previous_data['windSpeed']
        T2M_Change = temperature - previous_data['temperature']
        Precip_Change = precipProbability - previous_data['precipProbability']

        # Preprocess the features (including the changes)
        processed_features = np.array([WS2M_Change, T2M_Change, Precip_Change]).reshape(1, -1)

        # Make the prediction using the model
        raw_prediction = model.predict(processed_features)
        predicted_class = np.argmax(raw_prediction, axis=1)[0]

        # Save the input data (features and predicted class) to a CSV file for retraining
        new_data = {
            'latitude': latitude,
            'longitude': longitude,
            'windSpeed': windSpeed,
            'temperature': temperature,
            'humidity': humidity,
            'pressure': pressure,
            'dewPoint': dewPoint,
            'precipProbability': precipProbability,
            'predicted_class': predicted_class
        }

        # Append the new data to the CSV file
        new_df = pd.DataFrame([new_data])
        new_df.to_csv(data_file, mode='a', header=False, index=False)

        # Return the predicted event class
        return jsonify({'predicted_class': int(predicted_class)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/retrain', methods=['POST'])
def retrain():
    try:
        # Load the collected data
        data = pd.read_csv(data_file)

        # Split features and labels
        X = data[['windSpeed', 'temperature', 'humidity', 'pressure', 'dewPoint', 'precipProbability']]
        y = data['predicted_class']

        # Convert the labels to one-hot encoding
        y = pd.get_dummies(y).values

        # Retrain the model with the new data
        model.fit(X, y, epochs=10, batch_size=32)

        # Save the retrained model
        model.save('model/intel_climate_event_classifier_retrained.h5')

        # Return success response
        return jsonify({'message': 'Model retrained successfully!'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
