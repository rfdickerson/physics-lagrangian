
var g = 9.8;
var p = new pendulum(30, .5);

function pendulum(length, angle) {
    this.length = length;
    this.angle = angle;
    this.velocity = 0;
}

function createScene() {

    console.log("Hello world");

    draw();
    
}

function update(dt) {

    // compute acceleration
    var accel = -g/p.length * Math.sin(p.angle);

    // integrate velocity
    p.velocity = p.velocity + accel * dt;
    
    // integrate position
    p.angle = p.angle + p.velocity * dt;
}

// draw function
function draw() {

    update(.05);
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.fillStyle = "#FF0000";

    var offsetx = p.length*Math.sin(p.angle);
    var offsety = p.length*Math.cos(p.angle);

    var bx = 50;
    var by = 10;
    
    ctx.beginPath();
    ctx.moveTo(bx,by);
    ctx.lineTo(bx+offsetx,by+offsety);
    ctx.closePath();
    ctx.stroke();
    
    setTimeout(draw, 5);
    
}

