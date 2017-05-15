

import * as React from "react"

import { Pendulum } from "./Pendulum"
import { ParametersPanel } from "./ParametersPanel"

import {RimPendulum, createRimPendulum} from '../models/RimPendulum'
import { updateRim } from '../physics'

interface SimulationState {
    pendulum: RimPendulum
    running: boolean,
    lastUpdate: number
}

// Simulation state component
export class Simulation extends React.Component<undefined, SimulationState> {

    constructor() {
        super()

        this.state = {
            pendulum: createRimPendulum(0.02, 100.0, 200.0),
            running: true,
            lastUpdate: undefined
        }

    }

    componentDidMount() {
         requestAnimationFrame(() => {this.simulate() })
    }

    simulate() {

        var time = new Date();

        if (this.state.lastUpdate === undefined) {
            this.setState({
                lastUpdate: time.getTime() - 0.001
            })
        }
        var dt = time.getTime() - this.state.lastUpdate;

        dt *= 0.01;

        let p = updateRim(this.state.pendulum, dt);
        this.setState({
            "pendulum":  p,
            lastUpdate: time.getTime()
        })

        requestAnimationFrame(() => {this.simulate()})
        
    }

    lengthChanged(v: number) {
        this.setState({
            "pendulum": {...this.state.pendulum, length: v}
        });
    }

    velocityChanged(v: number) {
        this.setState({
            "pendulum": {...this.state.pendulum, omega: v}
        });
    }

    radiusChanged(v: number) {
        this.setState({
            "pendulum": {...this.state.pendulum, radius: v}
        });
    }

    render() {
        return (
            <div>
                <Pendulum pendulum={this.state.pendulum} />
                <ParametersPanel 
                    velocityChanged={(v) => this.velocityChanged(v) } 
                    lengthChanged={(v) => this.lengthChanged(v)} 
                    radiusChanged={(v) => this.radiusChanged(v)}
                    />

            </div>
        )
    }

}