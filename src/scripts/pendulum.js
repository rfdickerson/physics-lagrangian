
// Constants
var g = 9.8;
var p = new pendulum(130, .5);
var rp = new rimPendulum(0.2, 100.0, 100.0);
var lastUpdate = 0.0;

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
  this.angle = 0.0;
  this.angleV = 0.0;
}

function createScene() {

  window.requestAnimationFrame(draw);

}

function update(dt) {

  // compute acceleration
  var accel = -g/p.length * Math.sin(p.angle);

  // integrate velocity
  p.velocity = p.velocity + accel * dt;
    
  // integrate position
  p.angle = p.angle + p.velocity * dt;
}

function updateRim(dt) {

  var a = rp.radius;
  var b = rp.length;
  var theta = rp.angle
  var omega = rp.omega;
  var rotation = rp.rotation;
    
  var accel = a/b * omega*omega * Math.cos(theta - rotation)
      - g/b * Math.sin(theta - rotation);

  rp.rotation = rotation - dt * omega;
        
  rp.angleV = rp.angleV + dt * accel;
    
  rp.angle = rp.angle + dt * rp.angleV;
    
    
}

function drawRimPendulum(ctx) {

    var bx = rp.x + rp.radius*Math.cos(rp.rotation);
    var by = rp.y + rp.radius*Math.sin(rp.rotation);

    var px = bx + rp.length*Math.sin(rp.angle);
    var py = by + rp.length*Math.cos(rp.angle);

    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
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
    
}

// draw function
function draw() {

  var time = new Date();

  if (lastUpdate == 0) {
    lastUpdate = time.getTime() - 5;
  }
    
  var dt = time.getTime() - lastUpdate;
  lastUpdate = time.getTime();

    dt *= 0.01
    
    update(dt);
    updateRim(dt);
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.fillStyle = "#FFFF00";

    drawRimPendulum(ctx);

    var offsetx = p.length*Math.sin(p.angle);
    var offsety = p.length*Math.cos(p.angle);

    var bx = 100;
    var by = 10;
    
    ctx.beginPath();
    ctx.moveTo(bx,by);
    ctx.lineTo(bx+offsetx,by+offsety);
    ctx.closePath();
    ctx.stroke();

    window.requestAnimationFrame(draw);
    // setTimeout(draw, 5);
    
}

