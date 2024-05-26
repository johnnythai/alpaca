import React from 'react';

const Form = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        props.onFilter(e)

        // try {
        //     props.onFilter(e)
        // }
        // catch {
        //     const form = document.getElementById("form")
        //     const err = new Error

        //     alert(err)
        // }
    }

    return(
        <div className="container" id="form">
            <form onSubmit={handleSubmit}>
                {props.children}
            </form>
        </div>
    )
}

export default Form;