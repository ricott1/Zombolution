var HUMAN_SIZE = [10, 4, 4, 5];


function Brain(size) {
    this.size = size;
    this.intercepts = initializeIntercepts(this.size, 0.01, 2);
    this.coefficients = initializeCoeffs(this.size, 0.01, 2);
    //console.log(this.intercepts);
    //console.log(this.coefficients);
    this.propagate = function(inputs, layer) {
        var M = transpose(this.coefficients[layer]);
        var b = this.intercepts[layer+1];
        var outputs = [];
        for (var i = 0; i < b.length; i++) {
            
            var o = this.output(M[i], inputs, b[i]);
            outputs.push(o);
        }
        if (layer < this.coefficients.length - 1) {
            outputs = this.propagate(outputs, layer + 1);
        }
        return outputs;
    }


   //we calculate the scalar product w.x + c, where w=M[j], x=inputs, c = b[j], j is the j-th neuron of the layer
   this.output = function(w, x, c) {
      out = c;
      for (var i = 0; i < x.length; i++) {
         out += w[i] * x[i];
      }
      return relu(out);
   }
   
   this.mutate = function() {
    var mutated_intercepts = [];
    for(var i=0; i<size.length; i++) {
        var temp = [];
        for(var j=0; j<size[i]; j++){
          var inter = this.intercepts[i][j] + 2 * (Math.random() - 0.5) * MUTATION_RATE;
          temp.push(inter);
        };
    mutated_intercepts.push(temp);
    };
    this.intercepts = mutated_intercepts;
    
    var mutated_coeffs = [];
      for(var i=0; i<size.length - 1; i++) {
        var layerCoeffs = [];
        for(var j=0; j<size[i]; j++){
            var neuronCoeffs = [];
            for(var k=0; k<size[i+1]; k++){
              var cs = this.coefficients[i][j][k] + 2 * (Math.random() - 0.5) * MUTATION_RATE;
              neuronCoeffs.push(cs);
            };
          
          layerCoeffs.push(neuronCoeffs);
        };
        mutated_coeffs.push(layerCoeffs);
      };
  this.coefficients = mutated_coeffs;  
    
   }
}

function initializeIntercepts(size, mean, variance) {
  var intercepts = [];
  for(var i=0; i<size.length; i++) {
    var temp = [];
    for(var j=0; j<size[i]; j++){
      var inter = mean + 2 * (Math.random() - 0.5) * variance;
      temp.push(inter);
    };
    intercepts.push(temp);
  };
  return intercepts;
}

function initializeCoeffs(size, mean, variance) {
  var coeffs = [];
  for(var i=0; i<size.length - 1; i++) {
    var layerCoeffs = [];
    for(var j=0; j<size[i]; j++){
        var neuronCoeffs = [];
        for(var k=0; k<size[i+1]; k++){
          var cs = mean + 2 * (Math.random() - 0.5) * variance;
          neuronCoeffs.push(cs);
        };
      
      layerCoeffs.push(neuronCoeffs);
    };
    coeffs.push(layerCoeffs);
  };
  return coeffs;
}


function transpose(M) {
      var MTranspose = M[0].map(function(col, i) {
         return M.map(function(row) {
            return row[i]
         })
      });
      return MTranspose;
   }

   function relu(x) {
      return Math.max(0, x);
   }

   function identity(x) {
      return x;
   }

   function logistic(x) {
      return 1.0 / (1 + Math.exp(-x));
   }

   function tanh(x) {
      return Math.tanh(x);
   }
