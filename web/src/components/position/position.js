import React, { Component } from 'react';
import Form from '../apiForm';
import { apiURL } from '../config';
import TableDisplay from '../tables';
import { withCookies } from 'react-cookie';


class Symbol extends Component {
    render() {
        return(
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Ticker</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow has-addons">
                        <div className="control">
                           <input className="input" name="sym" type="text" maxLength="5" required/>
                        </div>
                        <div class="control">
                            <button class="button is-primary">
                            Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class PositionFilterForm extends Component {
    constructor(props) {
        super(props)
        this.handleFilter = this.handleFilter.bind(this)
    }

    handleFilter(e) {
        e.preventDefault()
        console.log('poisition e', e.target)
        this.props.onFilter(e)
    }

    render() {
        return(
            <div>
                <Form name="Account Info" onFilter={this.props.onFilter} button={'Submit'}>
                    <div><strong>Filter Positions by Ticker</strong></div>
                    <br/>
                    <Symbol />
                </Form>
            </div>
        )
    }
}

class PositionFilter extends Component {
    render() {
        return(
            <div className="AccountFilter">
                {this.props.data !== null
                ? <TableDisplay data={this.props.data} name={'Position'} onClick={this.props.onClick} />
                : <PositionFilterForm name="" onFilter={this.props.onFilter} />}
            </div>
        )
    }
}

class PositionList extends Component {
    render() {
        const fetchOptions = {
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + this.props.cookies.cookies.access_token
            }
        }

        const data = fetch(apiURL + '/api/alpaca/positions/', fetchOptions)
        .then(res => res.json())
        
        return(
            // TODO:
            <div>
                {data.length < 1
                ? <TableDisplay data={data} name={'Positions'} />
                : null}
            </div>
        )
    }
}

const PositionDisplay = (props) => {
    const handleFilter = (e) => {
        e.preventDefault()
        const url = apiURL + '/api/alpaca/positions/'
        const tabName = 'position'
        props.onFetch(e, tabName, url)
    }

    return(
        <div>
            <PositionFilter onFilter={handleFilter} data={props.data}
                onClick={props.handleClick} />
            <PositionList cookies={props.cookies} />    
        </div>
    )
}

export default withCookies(PositionDisplay);