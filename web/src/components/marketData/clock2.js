import React, { useState, useEffect } from 'react';
import { apiURL } from '../config'
import FetchAPI from '../fetch'

const MarketClose = (props) => {
    const clock = props.clock

    if (clock.timestamp !== null) {
        const futureDate = clock.nextOpen.getTime()
        const currentDate = clock.timestamp.getTime()
        const countdown = futureDate - currentDate

        const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
        
        if (days < 1) {
            return(
                <div>
                    Market is <strong>closed</strong>, but will open in 
                    <strong className='timer'> {hours}h {minutes}m {seconds}s</strong>.
                </div>
            )
        } else {
            return(
                <div>
                    Market is <strong>closed</strong>, but will open in 
                    <strong className='timer'> {days}d {hours}h {minutes}m {seconds}s</strong>.
                </div>
            )
        }

    } else {
        return(
            <div>Checking if the market is open...</div>
        )
    }
}

const MarketOpen = (props) => {
    return(
        <div>
            <div>Market is <strong>open.</strong></div>
            {props.children}
        </div>
    )
}

const MarketClock = (props) => {
    // TODO: fix clock

    const [timerID, setTimerID] = useState(null)
    const [state, setState] = useState({
        timestamp: null,
        nextOpen: null,
        nextClose: null,
        isOpen: null
    })

    const loginError = (error) => {
        alert(error)
        clearInterval(timerID)
    }

    const tick = () => {
        const url = apiURL + '/api/alpaca/clock/'

        try {
            FetchAPI(url, props.cookies, null)
            .then(result => {
                result instanceof Error
                ? loginError(result)
                : setState({
                    timestamp: new Date(result.timestamp),
                    nextOpen: new Date(result.next_open),
                    nextClose: new Date(result.next_close),
                    isOpen: result.is_open 
                })
            })
        }

        catch {
            let err = new Error(' Please log in.')
            loginError(err)
        }
    }

    useEffect(() => {
        setTimerID(timerID = setInterval(() => tick(), 1000))

        return(() => {
            setTimerID(clearInterval(timerID))
        })
    })

    return(
        <div className="container">                
            {state.isOpen
            ? <MarketOpen clock={state} >
                {props.children}
            </MarketOpen>
            : <MarketClose clock={state} />}
        </div>
    )
}

export default MarketClock;