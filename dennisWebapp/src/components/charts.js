import React, { Component } from 'react';
import ChartistGraph from 'react-chartist'; 

import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";


class ChartistChart extends Component {
    render() {
        
        var data = {
            labels: this.props.labels,
            series: [this.props.series]
          };

        var options = {
            shorPoint: true
        }
        
        const type = this.props.type

        return(
            <div>
                <ChartistGraph data={data} type={type} />
            </div>
        )
    }
}

export { ChartistChart };