

import * as React from "react"

import { Pendulum } from "./Pendulum"
import { ParametersPanel } from "./ParametersPanel"

import {RimPendulum, createRimPendulum} from '../models/RimPendulum'

interface SimulationState {
    pendulum: RimPendulum
    running: boolean
}

// Simulation state component
export class Simulation extends React.Component<undefined, SimulationState> {

    constructor() {
        super()

        this.state = {
            pendulum: createRimPendulum(0.02, 100.0, 200.0),
            running: true
        }

    }

    componentDidMount() {
         requestAnimationFrame(() => {this.simulate() })
    }

    simulate() {

        requestAnimationFrame(() => {this.simulate()})
        
    }

    lengthChanged(v: number) {
        this.setState({
            "pendulum": {...this.state.pendulum, length: v}
        })
    }

    render() {
        return (
            <div>
                <Pendulum pendulum={this.state.pendulum} />
                <ParametersPanel velocityChanged={(v) => v } lengthChanged={(v) => this.lengthChanged(v)} />
            </div>
        )
    }

}