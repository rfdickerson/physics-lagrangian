
// Constants
var g = 9.8;
var p = new pendulum(130, 2.14);
var rp = new rimPendulum(0.0, 100.0, 200.0);
var lastUpdate = 0.0;
var EPSILON = 0.01;

var g = newtonRaphson(
  function(x) { return x*x - 5*x - 4; },
  0);

console.log(g);

function pendulum(length, angle) {
  this.length = length;
  this.angle = angle;
  this.velocity = 0;
}

function rimPendulum(omega, radius, length) {
  this.x = 250;
  this.y = 150;
  this.omega = omega;
  this.rotation = 0.0;
  this.radius = radius;
  this.length = length;
  this.angle = 3.14;
  this.angleV = 0.0;
}

function createScene() {

  window.requestAnimationFrame(draw);

}


// Newton Raphson method of root finding.
function newtonRaphson(f, guess) {

  var fprime = derivative(guess, EPSILON, f);
  var newguess = guess - f(guess) / fprime;
  var diff = Math.abs(newguess - guess);

  if (diff <= EPSILON) {
    return newguess;
  } else {
    return newtonRaphson(f, newguess);
  }
  
}


// Approximation of the derivative at x 
function derivative(x, h, f) {
  return (f(x+h) - f(x)) / h;
}

function updatePendulum(dt) {

  // compute acceleration
  var accel = -g/p.length * Math.sin(p.angle);

  // integrate velocity
  // p.velocity = p.velocity + accel * dt;

  var v = p.velocity;
  
  p.velocity = newtonRaphson(
    function(x) {
      return x - v - dt * accel;
    }, 0);

   
  // integrate position
  p.angle = p.angle + p.velocity * dt;
}

function updateRim(dt) {

  var a = rp.radius;
  var b = rp.length;
  var theta = rp.angle
  var omega = rp.omega;
  var rotation = rp.rotation;
    
  var accel = a/b * omega*omega
      * Math.cos(theta - rotation)
      - g/b * Math.sin(theta);

  rp.rotation = rotation - dt * omega;

  // rp.angleV = rp.angleV + dt * accel;
  var p1 = rp.angle + dt * rp.angleV + 0.5*accel*dt*dt;
  var v1 = rp.angleV + 0.5*accel*dt;

  var accel2 = a/b * omega*omega
      * Math.cos(p1 - rotation)
      - g/b * Math.sin(p1)

  rp.angleV = v1 + 0.5*accel2*dt;

  rp.angle = p1;

  // var v = rp.angleV;
  // rp.angleV = newtonRaphson(
  //   function(x) {
  //     return x - v - dt * accel;
  //   }, 0);
  
 
    
    
}

function drawRimPendulum(ctx) {

    var bx = rp.x + rp.radius*Math.cos(rp.rotation);
    var by = rp.y + rp.radius*Math.sin(rp.rotation);

    var px = bx + rp.length*Math.sin(rp.angle + Math.PI);
    var py = by + rp.length*Math.cos(rp.angle + Math.PI);

   
    ctx.beginPath();
    ctx.arc(rp.x, rp.y, rp.radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath()
    ctx.arc(bx, by, 5, 0, 2*Math.PI);
    ctx.fill();

    ctx.moveTo(bx, by);
    ctx.lineTo(px, py);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(px, py, 10, 0, 2*Math.PI);
  ctx.stroke();
    
}

function drawPendulum(ctx) {
  var offsetx = p.length*Math.sin(p.angle + Math.PI);
  var offsety = p.length*Math.cos(p.angle + Math.PI);

  var bx = 500;
  var by = 100;
    
  ctx.beginPath();
  ctx.moveTo(bx,by);
  ctx.lineTo(bx+offsetx,by+offsety);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(bx + offsetx, by + offsety, 5, 0, 2*Math.PI);
  ctx.stroke();
}

// draw function
function draw() {

  var time = new Date();

  if (lastUpdate == 0) {
    lastUpdate = time.getTime() - 5;
  }
    
  var dt = time.getTime() - lastUpdate;
  lastUpdate = time.getTime();

  dt *= 0.1
    
  updatePendulum(dt);
  updateRim(dt);
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(0,153,255,1.0)';
  ctx.fillStyle = "#FFFF00";

  drawRimPendulum(ctx);

  drawPendulum(ctx);
  
  window.requestAnimationFrame(draw);
  // setTimeout(draw, 5);
    
}

function onVelocityChanged(slider) {

  var vel = slider.value;
  rp.omega = vel;
  
}