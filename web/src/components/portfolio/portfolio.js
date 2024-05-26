import React, { useEffect, useState } from 'react';
import Form from '../apiForm';
import TableDisplay from '../tables';
import { ChartistChart } from '../charts';
import { apiURL } from '../config';


const toMin = (date) => {
    return date.getMinutes()
}

const toHour = (date) => {
    return date.getHours()
}

const toDay = (date) => {
    return date.getDay()
}

const convertTime = (unixTime, convertTo) => {
    // convert unix time to YYYY-MM-DD
    const date = new Date(unixTime * 1000)      
    return convertTo(date)
}

const Period = () => {
    return(
        <div className="field has-addons">
            <div className="field-label is-normal">
                <label className="label">Period</label>
            </div>

            <div className="field-body">
                <div className="field is-narrow has-addons">
                    <div class="control">
                        <input class="input" name="period" type="number" min="1" defaultValue="1" />
                    </div>
                    <div className="control">
                        <span className="select" name="period_unit">
                            <select name="period_unit">
                                <option value="D">Day</option>
                                <option value="W">Week</option>
                                <option value="M">Month</option>
                                <option value="A">Year</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Timeframe = () => {
    return(
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Timeframe</label>
            </div>
            
            <div className="field-body">
                <div className="field is-narrow">
                    <div className="control">
                        <div className="select">
                        <select name="timeframe" id="timeframe-select" required="required">
                            <option value="">--Select an option--</option>
                            <option value="1Min">1 Min</option>
                            <option value="5Min">5 Min</option>
                            <option value="15Min">15 Min</option>
                            <option value="1H">1 Hour</option>
                            <option value="1D">1 Day</option>
                        </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DatePeriod = () => {
    return(
        <div className="field">
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Date Start</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                        <input className="input" name="date_start" type="date"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Date End</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                        <input className="input" name="date_end" type="date"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExtendedHours = () => {
    return(
        <div className="field has-addons">
            <div className="field-label is-normal">
                <label className="label">Extended Hours</label>
            </div>

            <div className="field-body">
                <div class="control">
                    <label class="radio">
                        <input type="radio" name="extended_hours" value="True"/>
                        Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="extended_hours" value="False"/>
                        No
                    </label>
                </div>
            </div>
        </div>
    )
}

const PortfolioFilterForm = (props) => {
    const handleFilter = (e) => {
        e.preventDefault()
        props.onFilter(e)
    }

    return(
        <div>
            <Form onFilter={handleFilter} button={'Submit'}>
                <fieldset>
                    <Period />
                    <Timeframe />
                    <DatePeriod />
                    <ExtendedHours />
                    <div class="field is-horizontal">
                        <div class="field-label">
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <button class="button is-primary is-rounded">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </Form>
        </div>
    )
}

const PortfolioFilter = (props) => {
    return(
        <div className="container">
            <div><strong>Portfolio</strong></div>
            <br/>
            {props.data !== null
            ? <TableDisplay data={props.data} name={'Portfolio'} onClick={props.onClick} />
            :<PortfolioFilterForm name="Portfolio History" onFilter={props.onFilter} />}
        </div>
    )
}

const PortfolioChart = (props) => {
    const timestamps = props.data['timestamp']
    const timeframe = props.timeframe
    
    const labels = timestamps.map(time => {
        if (timeframe === '1Min' || '5Min' || '15Min') {
            return convertTime(time, toMin)
        } else if (timeframe === '1H') {
            return convertTime(time, toHour)
        } else if (timeframe === '1D') {
            return convertTime(time, toDay)
        }
    })

    const series = props.data['equity']
    const type = 'Line'             
    
    return(
        <ChartistChart labels={labels} series={series} type={type} />
    )
}

const PortfolioDisplay = (props) => {
    const [state, setState] = useState({
        showTable: false,
        showChart: false
    })

    const handleFilter = (e) => {
        e.preventDefault()
        console.log('e', e)
        const url = apiURL + '/api/alpaca/portfolio/'
        const tabName = 'portfolio'
        props.onFetch(e, tabName, url)
    }

    useEffect(() => {
        if (props.data !== null) {
            setState(state => ({
                ...state,
                showChart: true
            }))
        }
    })

    return(
        <div>
            <PortfolioFilter onFilter={handleFilter} data={props.data}
            onClick={props.handleClick} />
            <div className="ct-chart"></div>
        </div>
    )
}

export default PortfolioDisplay;
