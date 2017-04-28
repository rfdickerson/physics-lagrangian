
import * as React from "react"

import { RimPendulum } from "../models/RimPendulum"

export interface PendulumProps {
  pendulum: RimPendulum
}



export class Pendulum extends React.Component<PendulumProps, undefined> {

  render() {

    const p = this.props.pendulum

    const a = 200*Math.PI*p.rotation

    const bx = p.x + p.radius*Math.cos(p.rotation)
    const by = p.y + p.radius*Math.sin(p.rotation)

    const px = bx + p.length*Math.sin(p.angle + Math.PI)
    const py = by + p.length*Math.cos(p.angle + Math.PI)

    const divStyle = {
      position: 'absolute' as any,
      color: 'blue',
      backgroundColor: 'blue',
      width: 20,
      height: p.length + "px",
      left: px + "px",
      top: py + "px",
      transform: "rotate(" + a + ")"
    }

    console.log('rotation ' + a)

    return (
      <div style={divStyle} />
    )
  }

}