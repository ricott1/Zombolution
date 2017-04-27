var zombies = [];
var humans = [];

var debug;
var magnet, clonable;

function setup() {
  createCanvas(1040, 660);
  for (var i = 0; i < 10; i++) {
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
    
    var a = zombies[i].position.x - magnet.x;
    var b = zombies[i].position.y - magnet.y;
    var c = Math.sqrt( a*a + b*b );
    if(c <= zombies[i].touch && clonable){
        var clone = zombies[i].clone();
        zombies.push(clone);
        clonable = false;
        zombies[i].health = 1;
    }
    if(zombies[i].isDead()){
        zombies.splice(i, 1);
    }
    
}
if (debug.checked()) {
	console.log(magnet);
    }
    
  }

function mouseClicked() {
  clonable = true;
  magnet = createVector(mouseX, mouseY);
}

