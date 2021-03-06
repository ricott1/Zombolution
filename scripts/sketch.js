var zombies = [];
var humans = [];
var debug;
var magnet;
var clonable = true;
var closest;

function setup() {
   createCanvas(500, 500);
   for (var i = 0; i < 5; i++) {
      var x = random(width);
      var y = random(height);
      humans[i] = createVector(x, y);
   }
   for (var i = 0; i < 12; i++) {
      var x = random(width);
      var y = random(height);
      zombies[i] = new Zombie(x, y);
   }

   debug = createCheckbox();
}


function draw() {
   background(51);
   for (var i = 0; i < humans.length; i++) {
      push();
      //console.log(humans[i].x, humans[i].y);
      translate(humans[i].x, humans[i].y);
      stroke(0, 152, 123);
      ellipse(0, 0, 20, 20);
      pop();
   }

   for (var i = zombies.length - 1; i >= 0; i--) {
      zombies[i].update();
      if (closest === zombies[i]) {
         zombies[i].display(true);
      } else {
         zombies[i].display();
      }
      for (var j = 0; j < humans.length; j++) {
         var a = zombies[i].position.x - humans[j].x;
         var b = zombies[i].position.y - humans[j].y;
         var c = Math.sqrt(a * a + b * b);
         if (c <= zombies[i].touch && clonable) {
            var clone = zombies[i].clone();
            zombies.push(clone);
            //clonable = false;
            zombies[i].health = 1;
            humans[j].x = random(width);
            humans[j].y = random(height);
         }
      }

      if (zombies[i].isDead()) {
         zombies.splice(i, 1);
      }

   }
   if (debug.checked()) {
      //zombies[0].brain.show();
      //console.log("Angle:", closest.seekAngle, closest.acceleration.x, closest.acceleration.y);
      //console.log(closest.brain);
   }

}

function mouseClicked() {
   var mvec = createVector(mouseX, mouseY);
   var d = Infinity;
   for (var i = zombies.length - 1; i >= 0; i--) {
      var a = zombies[i].position.x - mvec.x;
      var b = zombies[i].position.y - mvec.y;
      var c = Math.sqrt(a * a + b * b);
      if (c < d) {
         d = c;
         closest = zombies[i];
      }
   }
   if (closest) {
      console.log("Angle:", closest.seekAngle, closest.acceleration);
      //console.log("Brain:", closest.brain);
      //console.log("Inputs:", closest.inputs);
   }


}
