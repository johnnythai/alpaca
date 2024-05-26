import React from 'react';
import { render } from 'react-dom';
import Chart from './chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";


export default class ChartComponent extends React.Component {
	render() {
		if (this.props == null) {
			return <div>Loading...</div>
		}

		for (const [key, value] of Object.entries(this.props.data)) {
			const data = value
		}

		return (
			<TypeChooser>
				{type => <Chart type={type} data={this.props.data} />}
			</TypeChooser>
		)
	}
}
