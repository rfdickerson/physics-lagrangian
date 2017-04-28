
import * as React from "react"

import { RimPendulum } from "../models/RimPendulum"

export interface PendulumProps {
  pendulum: RimPendulum
}



export class Pendulum extends React.Component<PendulumProps, undefined> {

  render() {

    const p = this.props.pendulum

    const divStyle = {
      color: 'blue',
      backgroundColor: 'blue',
      width: p.length + "px",
      height: 20,
      left: p.x + "px",
      top: p.y + "px"
    }

    return (
      <div style={divStyle} />
    )
  }

}