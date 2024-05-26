import React from 'react';
import Form from '../apiForm';
import TableDisplay from '../tables';
import { apiURL } from '../config';


const ActivityType = () => {
    return(
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Activity Type</label>
            </div>
            <div className="field-body">
                <div className="field is-narrow has-addons">
                    <div className="control">
                        <div className="select">
                            <select name="activity_type" id="act-select" required="required">
                                <option value="">--Select an option--</option>
                                <option value="">All</option>
                                <option value="">Fill (partial and full)</option>
                                <option value="">Cash Transactions</option>
                                <option value="">Fees</option>
                                <option value="">Cash Disbursement</option>
                                <option value="">Cash Reciept</option>
                                <option value="">Merger/Acquisition</option>
                                <option value="">Name Change</option>
                                <option value="">Reorg CA</option>
                                <option value="">Symbol Change</option>
                                <option value="">Stock Spinoff</option>
                                <option value="">Stock Split</option>
                                <optgroup label="Dividends">
                                    <option value="">Dividends</option>
                                    <option value="">Dividend CGLT</option>
                                    <option value="">Dividen CGST</option>
                                    <option value="">Dividend Fee</option>
                                    <option value="">Foreign Tax Withheld</option>
                                    <option value="">NRA Withheld</option>
                                    <option value="">Return of Capital</option>
                                    <option value="">Tefra Withheld</option>
                                    <option value="">Tax Exempt</option>
                                </optgroup>
                                <optgroup label="Interest">
                                    <option value="">Credit/Margin</option>
                                    <option value="">NRA Withheld</option>
                                    <option value="">Tefra Withheld</option>
                                </optgroup>
                                <optgroup label="Journal">
                                    <option value="">Journal Entry</option>
                                    <option value="">Cash</option>
                                    <option value="">Stock</option>
                                </optgroup>
                                <optgroup label="Option">
                                    <option value="">Expiration</option>
                                    <option value="">Exercise</option>
                                </optgroup>
                                <optgroup label="Pass Thru">
                                    <option value="">Charge</option>
                                    <option value="">Rebate</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div class="control">
                        <button class="button is-primary">
                        Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        // <div className="ActivityType">

        //     <select name="activity_type" id="act-select" required="required">
        //         <option value="">--Select an option--</option>
        //         <option value="">All</option>
        //         <option value="">Fill (partial and full)</option>
        //         <option value="">Cash Transactions</option>
        //         <option value="">Fees</option>
        //         <option value="">Cash Disbursement</option>
        //         <option value="">Cash Reciept</option>
        //         <option value="">Merger/Acquisition</option>
        //         <option value="">Name Change</option>
        //         <option value="">Reorg CA</option>
        //         <option value="">Symbol Change</option>
        //         <option value="">Stock Spinoff</option>
        //         <option value="">Stock Split</option>
        //         <optgroup label="Dividends">
        //             <option value="">Dividends</option>
        //             <option value="">Dividend CGLT</option>
        //             <option value="">Dividen CGST</option>
        //             <option value="">Dividend Fee</option>
        //             <option value="">Foreign Tax Withheld</option>
        //             <option value="">NRA Withheld</option>
        //             <option value="">Return of Capital</option>
        //             <option value="">Tefra Withheld</option>
        //             <option value="">Tax Exempt</option>
        //         </optgroup>
        //         <optgroup label="Interest">
        //             <option value="">Credit/Margin</option>
        //             <option value="">NRA Withheld</option>
        //             <option value="">Tefra Withheld</option>
        //         </optgroup>
        //         <optgroup label="Journal">
        //             <option value="">Journal Entry</option>
        //             <option value="">Cash</option>
        //             <option value="">Stock</option>
        //         </optgroup>
        //         <optgroup label="Option">
        //             <option value="">Expiration</option>
        //             <option value="">Exercise</option>
        //         </optgroup>
        //         <optgroup label="Pass Thru">
        //             <option value="">Charge</option>
        //             <option value="">Rebate</option>
        //         </optgroup>
        //     </select>
        // </div>
    )
}

const ActivityFilterForm = (props) => {

    const handleFilter = (e) => {
        e.preventDefault()
        props.onFilter(e)
    }

    return(
        <Form name="Account Activity" onFilter={handleFilter} button={'Submit'}>
            <ActivityType />
        </Form>
    )
}

const ActivityFilter = (props) => {
    return(
        <div className="ActivityFilter">
            <div><strong>Account Activity</strong></div>
            <br/>
            {props.data !== null
            ? <TableDisplay data={props.data} name={'Account Activity'} onClick={props.onClick} />
            : <ActivityFilterForm name="Account Activity" onFilter={props.onFilter} />}
        </div>
    )
}

const ActivityDisplay = (props) => {

    const handleFilter = (e) => {
        e.preventDefault()
        const url = apiURL + '/api/alpaca/activity/'
        const tabName = 'activity'
        props.onFetch(e, tabName, url)
    }

    return(
        <div>
            <ActivityFilter onFilter={handleFilter} data={props.data} 
            onClick={props.handleClick} />
        </div>
    )
}

export default ActivityDisplay;