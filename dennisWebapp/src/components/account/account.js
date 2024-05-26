import React from 'react';
import Form from '../apiForm';
import TableDisplay from '../tables';
import { apiURL } from '../config';


const AccountOptions = () => {
    return(
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Account</label>
            </div>
            
            <div className="field-body">
                <div className="field is-narrow has-addons">
                    <div className="control">
                        <div className="select">
                            <select className="account">
                                <option value="">--Select Account--</option>
                                <option value="alpaca">Alpaca</option>
                            </select>
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AccountFilterForm = (props) => {

    const handleFilter = (e) => {
        e.preventDefault()
        props.onFilter(e)
    }

    return(
        <div>
            <Form name="Account Info" onFilter={props.onFilter}>
                <AccountOptions />
            </Form>
        </div>
    )
}

const AccountFilter = (props) => {
    return(
        <div className="AccountFilter">
            <div><strong>Account Info</strong></div>
            <br/>
            {props.data !== null
            ? <TableDisplay data={props.data} name={'Account Info'} onClick={props.onClick} />
            : <AccountFilterForm name="Account Info" onFilter={props.onFilter} />}
        </div>
    )
}

const AccountDisplay = (props) => {
    const handleFilter = (e) => {
        e.preventDefault()
        const url = apiURL + '/api/alpaca/account/'
        const tabName = 'account'
        props.onFetch(e, tabName, url)
    }

    return(
        <AccountFilter onFilter={handleFilter} data={props.data}
        onClick={props.handleClick} /> 
    )
}

export default AccountDisplay;