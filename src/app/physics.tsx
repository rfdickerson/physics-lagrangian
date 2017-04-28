
import * as React from "react"

import { RimPendulum, createRimPendulum } from './models/RimPendulum'

// Constants
const g = 9.8

var lastUpdate = 0.0

const EPSILON = 0.01

// Newton Raphson method of root finding.
function newtonRaphson(f: MyFunction, guess: number): number {

  var fprime = derivative(guess, EPSILON, f);
  var newguess = guess - f(guess) / fprime;
  var diff = Math.abs(newguess - guess);

  if (diff <= EPSILON) {
    return newguess;
  } else {
    return newtonRaphson(f, newguess);
  }

}


type MyFunction = (x: number) => number 

// Approximation of the derivative at x
function derivative(x: number, h: number, f: MyFunction) {
  return (f(x+h) - f(x)) / h;
}


export function updateRim(rp: RimPendulum, dt: number): RimPendulum {

  var a = rp.radius;
  var b = rp.length;
  var theta = rp.angle
  var omega = rp.omega;
  var rotation = rp.rotation;

  var accel = a/b * omega*omega
      * Math.cos(theta - rotation)
      - g/b * Math.sin(theta);

  // rp.rotation = rotation - dt * omega;

  var p1 = rp.angle + dt * rp.angleV + 0.5*accel*dt*dt;
  var v1 = rp.angleV + 0.5*accel*dt;

  var accel2 = a/b * omega*omega
      * Math.cos(p1 - rotation)
      - g/b * Math.sin(p1)

  //rp.angleV = v1 + 0.5*accel2*dt;

  //rp.angle = p1;

  return { ...rp, 
    "angle": p1,
    "angleV": v1 + 0.5*accel2*dt,
    "rotation": rotation - dt * omega,
  }

}

