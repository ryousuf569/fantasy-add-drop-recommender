from xgboost import XGBRegressor as xgb
import os, sys
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)
from db.centerdataprep import load_train_test_from_mongo

X_train, X_test, Y_train, Y_test = load_train_test_from_mongo()

'''
Since I'm building an XGB model for the first time
I've left a number of in-line comments for my own use
'''

cmodel = xgb(
    n_estimators=1000,  # number of boosting rounds (trees). More trees = more learning capacity, but higher risk of overfitting.
    learning_rate=0.05,  # shrinkage factor controlling how much each tree contributes (smaller = slower, safer learning).
    max_depth=6,  # maximum depth of each tree (controls model complexity; deeper trees capture more interactions but can overfit).
    subsample=0.8, # fraction of training rows used per tree (adds randomness → prevents overfitting, like bagging).
    colsample_bytree=0.8, # fraction of features (columns) used per tree (reduces correlation between trees, improves generalization).
    reg_lambda=1.0, # L2 regularization term on leaf weights (helps smooth predictions and prevent overfitting).
    random_state=42,  # seed for reproducibility (ensures consistent results across runs).
    eval_metric='rmse', # metric to evaluate model quality (Root Mean Squared Error)
    early_stopping_rounds=25
)

cmodel.fit(
    X_train, Y_train, # training features (X) and target values (y)
    eval_set=[(X_test, Y_test)], # validation data to monitor performance during training
    verbose=False  # suppresses per-iteration logs for cleaner output) # stops training if validation RMSE doesn't improve for 25 rounds (prevents overfitting)
)