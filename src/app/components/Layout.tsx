

import * as React from "react"

import { Pendulum } from "./Pendulum"
import { ParametersPanel } from "./ParametersPanel"

export class Layout extends React.Component<undefined, undefined> {

    constructor() {
        super()

    }

    render() {
        return (
            <ParametersPanel velocityChanged={(v) => v } lengthChanged={(v) => v} />
        )
    }

}