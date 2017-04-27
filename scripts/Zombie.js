function Zombie(x, y) {	
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0.32);
  this.position = createVector(x, y);
  this.r = 5;
  this.maxspeed = 2;
  this.maxforce = 0.05;

  this.health = 1;
  this.brain = new Brain(zombieSize);
  this.update = function() {

    this.health -= 0.0005;

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);

    this.seek(magnet);
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
