var HEALTH_LOSS = 0.00025;
var TOUCH = 20;
//This variables contains the hidden layers size plus output
var ZOMBIE_SIZE = [10, 2, 2, 1];
var MUTATION_RATE = 1.25;
function Zombie(x, y) {	
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0.32);
  this.position = createVector(x, y);
  this.r = 5;
  this.maxspeed = 0.5;
  this.maxforce = 0.075;
  this.touch = TOUCH;
  this.health = 1;
  this.brain = new Brain(ZOMBIE_SIZE);
  this.update = function() {
    this.health -= HEALTH_LOSS;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    
    var inputs = []
    for(var i=0; i<this.brain.size[0]; i++) {
        inputs.push(0);
    }
    inputs[0] = this.position.x - magnet.x;
    inputs[1] = this.position.y - magnet.y;
    var angle = TWO_PI * this.brain.propagate(inputs, 0);// + this.velocity.heading();
    //console.log("Magnet:", inputs[0], inputs[1]);
    //console.log("Angle:", angle, this.brain.propagate(inputs, 0));
    var target = createVector(this.position.x * (1 + Math.cos(angle)), this.position.y* (1 + Math.sin(angle)));
    this.seek(target);
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
        z.brain.mutate();
        return z;
    
    }
  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var angle = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    var gr = color(0, 255, 0);
    var rd = color(255, 0, 0);
    var col = lerpColor(rd, gr, this.health);

    fill(col);
    stroke(col);
    strokeWeight(1);
    ellipse(0, 0, this.r*4, this.r*4);
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
		text(txt, - textWidth(txt)/2, 0);
		pop();
    }
    
  }


}
