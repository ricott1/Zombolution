import random, math
from sklearn.neural_network import MLPClassifier, MLPRegressor
from sklearn.preprocessing import StandardScaler , RobustScaler 
import numpy as np

def dist(x, y):
    return (x**2 + y**2)**0.5

def a(x, y):
    return math.atan2(y, x)

def find_closest_angle(inputs):
    closest = inputs.index(min([inputs[i] for i in xrange(0, len(inputs), 2  )] ))
    return inputs[closest+1]
    
def order(inputs):
	ord_temp = list(inputs)
	for i in xrange(0, len(inputs), 2):
		clos = inputs[i]
		for j in xrange(i, len(inputs), 2):
			closj = inputs[j]
			if closj < clos:
				c, d = (float(ord_temp[i]), float(ord_temp[i+1]))
				ord_temp[i], ord_temp[i+1] = (ord_temp[j], ord_temp[j+1])
				ord_temp[j], ord_temp[j+1] = (c, d)

def rescale_data(scaler, X_test, X_train):
    scaler.fit(X_train)  
    X_train = scaler.transform(X_train)  
    X_test = scaler.transform(X_test) 
    return (X_test, X_train)   

def write_data(scaler, smlp):     
    def get_string(name, l):
        string = "var {} = [".format(name) + ", ".join([str(c.tolist()) for c in l]) + "];"
        return string 
             
    with open("zombie_training.js", "w") as f:
        f.write(get_string("coefficients_training", mlp.coefs_) + "\n")
        f.write(get_string("intercepts_training", mlp.intercepts_) + "\n") 
        f.write(get_string("means_training", scaler.center_) + "\n") 
        f.write(get_string("scales_training", scaler.scale_) + "\n")

def build_inputs(n):
    for i in xrange(n):
        if i<hum:
        	x = random.randint(-w, w)
        	y = random.randint(-h, h)
        	yield dist(x, y)
        	yield a(x, y)
        else:
            yield 0.0
            yield 0.0


w, h = (500, 500)
N = 30000
hum = 5
inputs = []
outputs = []
for n in xrange(N):
    temp = list(build_inputs(5))
    #ord_temp = order(temp)
    outputs.append(find_closest_angle(temp))
    inputs.append(temp)
    
    
shape = (6, 3)
mlp = MLPRegressor(hidden_layer_sizes=shape, max_iter=20000, alpha=3*1e-3, solver="lbfgs",
                            activation="relu", verbose=1, tol=1e-13, random_state=1,
                            learning_rate_init=.53300, warm_start=True)
scaler = RobustScaler()
CUT = int(10./100 * len(inputs))
X_test, X_train = inputs[:CUT], inputs[CUT:]
y_test, y_train = outputs[:CUT], outputs[CUT:]
X_test_rescaled, X_train_rescaled = rescale_data(scaler, X_test, X_train)
        
mlp.fit(X_train_rescaled, y_train) 
print "Training set score: %f" % mlp.score(X_train_rescaled, y_train)
print "Test set score: %f" % mlp.score(X_test_rescaled, y_test)
print inputs[0], y_test[0]
print mlp.predict(np.array(X_test_rescaled[0]).reshape(1,-1))
write_data(scaler, mlp)
