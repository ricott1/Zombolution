function Brain(coefficients = [ [[1,1],[1,1]], [[1],[1]] ], intercepts = [[1,1],[1,1],[1]], learning_rate = 0.25) {
    for(var i ==0; i<size.length; i++){
       // intercepts.push();
    }
    this.coefficients = coefficients;
    this.intercepts = intercepts;
   this.propagate = function(inputs, layer) {
      var M = transpose(this.coefficients[layer]);
      var b = this.intercepts[layer];
      var outputs = [];
      }
      for (var i = 0; i < b.length; i++) {
         var o = output(M[i], inputs, b[i]);
         outputs.push(o);
      }
      if (layer < this.coefficients.length - 1) {
         outputs = propagate(outputs, layer + 1);
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
}