

export interface RimPendulum {
  x: number
  y: number
  omega: number 
  rotation: number
  radius: number
  length: number
  angle: number
  angleV: number 
}

export function createRimPendulum(omega: number, radius: number, length: number) {
  return {
    x: 250,
    y: 150,
    omega: omega,
    rotation: 0.0,
    radius: radius,
    length: length,
    angle: 3.14,
    angleV: 0.0
  }
}