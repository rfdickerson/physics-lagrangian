
import * as React from "react"

import { Panel } from 'react-bootstrap'

export interface ParametersPanelProps {
  velocityChanged: (value: number) => void
  lengthChanged: (value: number) => void
}

export interface ParametersPanelState {
  velocity: number
  length: number
}

export class ParametersPanel extends React.Component<ParametersPanelProps, ParametersPanelState> {


  constructor() {
    super()

    this.state = {
      velocity: 0,
      length: 50
    }

  }

  changeVelocity(e: React.ChangeEvent<HTMLInputElement>) {
    var value = e.currentTarget.value
    console.log(value)
    this.setState({ "velocity": +value })
    this.props.velocityChanged(+value)
  }

  changeLength(e: React.ChangeEvent<HTMLInputElement>) {
    var value = e.currentTarget.value
    console.log(value)
    this.setState({ "length": +value })
    this.props.lengthChanged(+value)
  }

  render() {
    return (
      <div>
        <h3>Parameters</h3>
        <div className="input-group">
          <span className="input-group-addon">Rim Velocity</span>
          <input
            className="form-control"
            type="range"
            id="rimvelocity"
            width="500"
            min="0"
            max="0.1"
            step="0.001"
            value={this.state.velocity}
            onChange={e => this.changeVelocity(e)} />
        </div>

        <div className="input-group">
          <span className="input-group-addon">Length</span>
          <input
            className="form-control"
            type="range"
            id="rimvelocity"
            width="500"
            min="10"
            max="200"
            step="20"
            value={this.state.length}
            onChange={this.changeLength}
          />

        </div>
      </div>
    )
  }

}