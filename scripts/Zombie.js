var HEALTH_LOSS = 0.000725;
var TOUCH = 20;
//This variables contains the hidden layers size plus output
var ZOMBIE_SIZE = [10, 6, 3, 1];
var MUTATION_RATE = 1.25;

function Zombie(x, y) {
   this.maxspeed = 0.75;
   this.maxforce = 0.05;
   this.acceleration = createVector(0, 0);
   
   this.velocity = createVector(this.maxspeed, 0);
   this.position = createVector(x, y);
   this.seekAngle = 0;
   this.r = 5;

   this.touch = TOUCH;
   this.health = 1;
   this.inputs = [];
   this.brain = new Brain(ZOMBIE_SIZE);
   this.update = function() {
      this.health -= HEALTH_LOSS;
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      if (this.position.x > width) {
         this.position.x = 0;
      }
      if (this.position.x < 0) {
         this.position.x = width;
      }
      if (this.position.y > height) {
         this.position.y = 0;
      }
      if (this.position.y < 0) {
         this.position.y = height;
      }
      this.acceleration.mult(0);

      this.inputs = [];
      for (var i = 0; i < this.brain.size[0]; i++) {
         this.inputs.push(0);
      }
      for (var i = 0; i < humans.length; i++) {
         this.inputs[2 * i] = distance(this.position.x - humans[i].x, this.position.y - humans[i].y);
         this.inputs[2 * i + 1] = Math.atan2(this.position.y - humans[i].y,this.position.x - humans[i].x);
      }
        //var ordered_inputs = reorder(this.inputs);
        var rescaled_inputs = rescale(this.inputs, means_training, scales_training);
      //inputs[0] = this.position.x - magnet.x;
      //inputs[1] = this.position.y - magnet.y;
      this.seekAngle = this.brain.propagate(this.inputs, 0); // - this.velocity.heading();

      //this.acceleration.rotate(this.velocity.heading());
      //wrong! 
      //this.velocity = createVector(Math.cos(this.seekAngle), Math.sin(this.seekAngle));
      
      var target = createVector(this.position.x * (1 + Math.cos(this.seekAngle)), this.position.y* (1 + Math.sin(this.seekAngle)));
      this.seek(target);
      //this.velocity.rotate(0.0001*(this.seekAngle-this.velocity.heading()));
      //  console.log(this.acceleration);
      //console.log("Magnet:", inputs[0], inputs[1]);
      //console.log("Angle:", angle, this.acceleration);
     
   }

   this.applyForce = function(force) {
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
   }

   this.seek = function(target) {

      var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

      // Scale to maximum speed
      desired.setMag(this.maxspeed);

      // Steering = Desired minus velocity
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce); // Limit to maximum steering force

      //return steer;
      this.applyForce(steer);
   }

   this.isDead = function() {
      return (this.health < 0)
   }
   this.clone = function() {
      var z = new Zombie(this.position.x, this.position.y);
      z.brain = this.brain;
      //z.brain.mutate();
      return z;

   }
   this.display = function(selected = false) {
      // Draw a triangle rotated in the direction of velocity
      var angle = this.velocity.heading() + PI / 2;

      push();
      translate(this.position.x, this.position.y);
      rotate(angle);
      var gr = color(0, 255, 0);
      var rd = color(255, 0, 0);
      var col = lerpColor(rd, gr, this.health);

      fill(col);
      if (selected) {
         stroke(color(255, 255, 255));
      } else {
         stroke(col);
      }
      strokeWeight(1);
      ellipse(0, 0, this.r * 4, this.r * 4);


      beginShape();
      vertex(0, -this.r * 4);
      vertex(-this.r, 0);
      vertex(this.r, 0);
      endShape(CLOSE);
      
      pop();



      if (debug.checked()) {
         push();
         translate(this.position.x, this.position.y);
         var txt = this.health;
         text(txt, -textWidth(txt) / 2, 0);
         strokeWeight(2);
      stroke(color(255, 255, 255))
      line(0, 0, 15*(this.velocity.x - this.position.x), 15*(this.velocity.y - this.position.y));
         pop();
      }

   }


}
