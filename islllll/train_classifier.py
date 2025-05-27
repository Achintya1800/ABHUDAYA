import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np

# Load dataset
data_dict = pickle.load(open('./data.pickle', 'rb'))
data = np.array(data_dict['data'])  # No need for padding
labels = np.array(data_dict['labels'])

x_train, x_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, shuffle=True, stratify=labels)

# Train model
model = RandomForestClassifier()
model.fit(x_train, y_train)

y_predict = model.predict(x_test)
score = accuracy_score(y_test, y_predict)

print('{}% of samples were classified correctly!'.format(score * 100))

# Save model
with open('model.p', 'wb') as f:
    pickle.dump({'model': model}, f)
