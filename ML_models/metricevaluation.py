from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from guardxgbmodel import *
from forwardsxgbmodel import *
import numpy as np

Y_prediction = fmodel.predict(X_test)
mae = mean_absolute_error(Y_test, Y_prediction)
mse = np.sqrt(mean_squared_error(Y_test, Y_prediction))
r2 = r2_score(Y_test, Y_prediction)

print(f"MAE: {mae:.2f} | RMSE: {mse:.2f} | R²: {r2:.3f}")