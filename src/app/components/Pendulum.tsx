
import * as React from "react"

import { RimPendulum } from "../models/RimPendulum"

export interface PendulumProps {
  pendulum: RimPendulum
}



export class Pendulum extends React.Component<PendulumProps, undefined> {

  render() {

    const p = this.props.pendulum

    const a = Math.PI*p.rotation

    const bx = p.x + p.radius*Math.cos(p.rotation)
    const by = p.y + p.radius*Math.sin(p.rotation)

    const px = bx + p.length*Math.sin(p.angle + Math.PI)
    const py = by + p.length*Math.cos(p.angle + Math.PI)

    return (
      <div>
      <svg width="800" height="600">
        <line x1={bx} y1={by} x2={px} y2={py}
              strokeWidth="8" stroke="blue" />
        </svg>
        </div>
    )
  }

}