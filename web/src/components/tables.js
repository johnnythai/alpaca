import React from 'react';


const TableRow = (props) => {
    const data = props.data
    const rows = []

    for (const [key, value] of Object.entries(data)) {
        rows.push(
                <tr key={key} data={data}>
                    <td>{key}</td>
                    <td>{value}</td>   
                </tr>
        );
    };

    return(
        <tbody>
            {rows}
        </tbody>
    )
}

const Table = (props) => {
    return(
        <div className="AccountTable">
            <legend>
                <div>
                    <button className="delete is-small" onClick={props.onClick} />
                </div>
            </legend>
            <table className="table" border="1" width="90%">
                <TableRow data={props.data} />
            </table>
        </div>
    )
}

const TableDisplay = (props) => {
    return(
        <div className="container">
            <Table data={props.data} name={props.name} onClick={props.onClick} />
        </div>
    )
}

export default TableDisplay;
