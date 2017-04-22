var zombies = [];
var humans = [];

var debug;
var magnet;

function setup() {
  createCanvas(640, 360);
  for (var i = 0; i < 3; i++) {
    var x = random(width);
    var y = random(height);
    zombies[i] = new Zombie(x, y);
  }
     debug = createCheckbox();
     magnet = createVector(5, 5);
}


function draw() {
	background(51);
	push();
	translate(magnet.x, magnet.y);
	stroke(0,255,123);
	ellipse(0,0,20,20);
	pop();
 for (var i = zombies.length - 1; i >= 0; i--) {
    zombies[i].update();
    zombies[i].display();
}
if (debug.checked()) {
	console.log(magnet);
    }
    
  }

function mouseClicked() {
  magnet = createVector(mouseX, mouseY);
}

