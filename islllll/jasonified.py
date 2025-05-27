import pickle
import cv2
import mediapipe as mp
import numpy as np
import json
import time  # Import time module
import os

# Get the absolute path to the model.p file
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'model.p')

try:
    # Load the model using the absolute path
    model_dict = pickle.load(open(model_path, 'rb'))
    model = model_dict['model']
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    exit(1)

cap = cv2.VideoCapture(0)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

labels_dict = {0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 
               9: 'A', 10: 'B', 11: 'C', 12: 'D', 13: 'E', 14: 'F', 15: 'G', 16: 'H', 
               17: 'I', 18: 'J', 19: 'K', 20: 'L', 21: 'M', 22: 'N', 23: 'O', 24: 'P', 
               25: 'Q', 26: 'R', 27: 'S', 28: 'T', 29: 'U', 30: 'V', 31: 'W', 32: 'X', 
               33: 'Y', 34: 'Z'}

predicted_characters = []  # List to store detected characters

while True:
    data_aux = []
    x_ = []
    y_ = []

    ret, frame = cap.read()
    if not ret:
        print(json.dumps({"error": "Failed to capture frame"}))
        break

    H, W, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = hands.process(frame_rgb)
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            for landmark in hand_landmarks.landmark:
                x_.append(landmark.x)
                y_.append(landmark.y)

        for hand_landmarks in results.multi_hand_landmarks:
            for landmark in hand_landmarks.landmark:
                data_aux.append(landmark.x - min(x_))
                data_aux.append(landmark.y - min(y_))

        # Ensure exactly 84 features
        while len(data_aux) < 84:
            data_aux.append(0.0)

        try:
            # Predict
            prediction = model.predict([np.asarray(data_aux)])
            predicted_character = labels_dict[int(prediction[0])]
        except Exception as e:
            print(json.dumps({"error": f"Prediction failed: {str(e)}"}))
            break
        
        # Store in list if it's not a duplicate of the last entry
        if not predicted_characters or predicted_characters[-1] != predicted_character:
            predicted_characters.append(predicted_character)

        # Display results
        x1 = int(min(x_) * W) - 10
        y1 = int(min(y_) * H) - 10
        x2 = int(max(x_) * W) - 10
        y2 = int(max(y_) * H) - 10

        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
        cv2.putText(frame, predicted_character, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3, cv2.LINE_AA)

    cv2.imshow('frame', frame)
    print(predicted_characters)
    # Print JSON response with all detected characters
    print(json.dumps({"predicted_characters": predicted_characters}))

    # Wait for 1.5 seconds before making the next prediction
    time.sleep(2)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print(predicted_characters)
# Final JSON Output when 'q' is pressed
final_predicted_string = ''.join(predicted_characters)
print(json.dumps({"final_predicted_characters": predicted_characters, "final_predicted_string": final_predicted_string}, indent=4))