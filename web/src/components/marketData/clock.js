import React, { Component } from 'react';
import { apiURL } from '../config'
import FetchAPI from '../fetch'

class MarketClose extends Component {
    render() {
        const clock = this.props.clock
        console.log('clock', clock)

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
}

class MarketOpen extends Component {
    render() {
        return(
            <div>
                <div>Market is <strong>open.</strong></div>
                {this.props.children}
            </div>
        )
    }
}

export default class MarketClock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timestamp: null,
            nextOpen: null,
            nextClose: null,
            isOpen: false
        }
    }

    loginError(error) {
        alert(error)
        clearInterval(this.timerID);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
      }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    tick() {
        const url = apiURL + '/api/alpaca/clock/'

        try {
            FetchAPI(url, this.props.cookies, null)
            .then(result => {
                result instanceof Error
                ? this.loginError(result)
                : this.setState({
                    timestamp: new Date(result.timestamp),
                    nextOpen: new Date(result.next_open),
                    nextClose: new Date(result.next_close),
                    isOpen: result.is_open 
                })
            })
        }

        catch {
            let err = new Error(' Please log in.')
            this.loginError(err)
        }

    }

    render() {
        return(
            <div className="container">                
                {this.state.isOpen
                ? <MarketOpen clock={this.state} >
                    {this.props.children}
                </MarketOpen>
                : <MarketClose clock={this.state} />}
            </div>

        )
    }
}