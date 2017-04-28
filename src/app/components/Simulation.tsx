

import * as React from "react"

import { Pendulum } from "./Pendulum"
import { ParametersPanel } from "./ParametersPanel"

import {RimPendulum, createRimPendulum} from '../models/RimPendulum'
import { updateRim } from '../physics'

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

        let p = updateRim(this.state.pendulum, 0.1)
        this.setState({
            "pendulum": {...this.state.pendulum, rotation: p.rotation}
        })

        console.log(p)

        requestAnimationFrame(() => {this.simulate()})
        
    }

    lengthChanged(v: number) {
        this.setState({
            "pendulum": {...this.state.pendulum, length: v}
        })
    }

    velocityChanged(v: number) {
        this.setState({
            "pendulum": {...this.state.pendulum, omega: v}
        })
    }

    render() {
        return (
            <div>
                <Pendulum pendulum={this.state.pendulum} />
                <ParametersPanel 
                    velocityChanged={(v) => this.velocityChanged(v) } 
                    lengthChanged={(v) => this.lengthChanged(v)} 
                    />

            </div>
        )
    }

}