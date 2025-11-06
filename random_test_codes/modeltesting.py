from sklearn.metrics import mean_absolute_error as mae

actual = [1, 2, 3, 4, 5, 6]
output = [2, 3, 4, 5, 6, 7]

error = mae(actual, output)
print(error)