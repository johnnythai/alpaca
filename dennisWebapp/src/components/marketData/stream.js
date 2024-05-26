import React, { Component, useState } from 'react';
import Websocket from 'react-websocket';
// import useWebsocket from 'react-use-websocket';
import TableDisplay from '../tables';
import Form from '../apiForm';
import ChartComponent from './index';
import { withCookies } from 'react-cookie';
import { apiURL ,wsURL } from '../config';
import MarketClock from './clock';

const FormFields = () => {
    return(
        <div className="field">
            Stream data for: <input className="field" type="text" name="symbol" placeholder="ticker e.g. AAPL" maxLength="5" />
        </div>
    )
}

const ChannelsForm = (props) => {
    const handleStream = (e) => {
        e.preventDefault()
        props.onStream()
    }

    const handleReset = (e) => {
        e.preventDefault()
        props.onReset()
    }

    return(
        <div>
            <Form onFilter={props.onFilter} button={'Subscribe'}>
                <fieldset>
                    <FormFields />
                </fieldset>
            </Form>

            <button className="button is-dark is-small is-outlined" onClick={handleStream}>
                Send subcriptions to websocket
            </button>
            <button className="button is-dark is-small is-outlined" onClick={handleReset}>
                Clear state.channels
            </button>
        </div>
    )
}

const AlpacaWebsocketStream = (props) => {
    let charts = []
    // gives us data
    for (let i = 0; i < props.data.length; i++) {
        for (const [key, value] of Object.entries(props.data[i])) {
            if (value.length > 1) {
                charts.push(
                    <div>
                        <h2>{key}</h2>
                        <ChartComponent data={value} />
                    </div>
                )
            }
        }   
    }

    return(
        <div>
            {props.isStreaming
            ? <div>
                {charts}
            </div>
            : null}
        </div>
    )
}

const AlpacaWebsocketChannels = (props) => {
    return(
        <div>
            {props.channels.length > 1
            // TODO: Include chartist or react stockchart
            ? <div>
                <h2>Subcriptions:</h2>
                <p>{JSON.stringify(props.channels)}</p>
            </div>
            : null}
        </div>
    )
}

const AlpacaWebsocket = (props) => {
    const [state, setState] = useState({
        isConnected: false,
        channels: [],
        symbols: [],
        isStreaming: false,
        data: [],
        dataQueue: []
    })
    const [refWebsocket, setRefWebsocket] = useState(null)

    const access = props.allCookies['access_token']
    const url = wsURL + '/ws/alpaca/stream/'
    const urlWithAccess = url + '?' + 'token=' + access

    const handleFilter = (e) => {
        // add channel to state.channels
        e.preventDefault()
        const formData = new FormData(e.target)

        const symbols = state.symbols.slice()
        const symbol = formData.get('symbol')       

        const channels = state.channels.slice()
        const channel = 'alpacadatav1/AM.' + symbol.toUpperCase()

        if (state.channels.includes(channel) === false) {
            setState(state => {
                return(
                    {
                        ...state,
                        channels: channels.concat(channel),
                        symbols: symbols.concat(symbol.toUpperCase())
                    }
                )
            })
        } else {
            const err = new Error(' Already Subsribed')
            alert(err)
        }
    }

    const filterData = (data) => {
        const sym = data.symbol 
        const bar = {
            date: new Date((data.timestamp)),
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            volume: data.volume
        }

        // array of symbols inside state.data
        const dataSymbols = []
        for (let i = 0; i < state.data.length; i++) {
            const dataSymbol = Object.getOwnPropertyNames(state.data[i])
            dataSymbols.push(dataSymbol[0])
        }

        // check if sym in dataSymbols
        if (dataSymbols.includes(sym)) {
            // append bar to existing ticker
            const tickers = state.data.slice()

            for (let i = 0; i < state.data.length; i++) {
                if (tickers[i][sym] !== undefined) {
                    tickers[i][sym].push(bar)                    
                    setState(state => ({
                        ...state,
                        data: tickers
                    }))
                }
            }
        } else {
            // add new object to state.data
            const tickers = state.data.slice()
            const newTicker = {
                [sym]: [bar]
            }
            tickers.push(newTicker)
            setState(state => ({
                ...state,
                data: tickers
            }))
        }

        setState(state => ({
            ...state,
            isStreaming: true
        }))
    }

    const handleReset = () => {
        setState(state => ({
            ...state, channels: [], symbols: []
        }))
    }

    const sendMessage = (message) => {
        // TODO: implement react websocket hook
        refWebsocket.sendMessage(message)
    }

    const handleMessage = (message) => {
        // message received from websocket
        const msg = JSON.parse(message)

        if (msg.message.subscriptions){
            setState((state) => ({
                ...state,
                channels: msg.message.subscriptions
            }))
        } else if (msg.message.data) {
            filterData(msg.message.data)
        }
    }

    const handleOpen = () => {
        //TODO: pull historical data, add to state
        console.log('connection opened')
    }

    const handleConnect = (e) => {
        e.preventDefault()
        console.log('connecting...')
        setState(state => ({
            ...state,
            isConnected: true
        }))
    }

    const handleStream = () => {
        setState(state => ({
            ...state,
            isStreaming: true
        }))

        if (state.channels.length !== 0) {
            const message = {
                'message': {
                    'subscribe': state.channels
                }
            }
            const jsonMessage = JSON.stringify(message)
            sendMessage(jsonMessage)
        }
    }

    const handleClose = (e) => {
        e.preventDefault()
        console.log('closing connection')
        setState(state => ({
            ...state,
            isStreaming: false,
            isConnected: false
        }))
    }

    console.log('market state', state)

    return(
        <div className="container">
            <AlpacaWebsocketChannels channels={state.channels} />
            
            <div>
                {state.isConnected
                ? <div>
                    <ChannelsForm onFilter={handleFilter} onReset={handleReset} onStream={handleStream} />
                    <Websocket url={urlWithAccess}
                        onMessage={handleMessage} 
                        onOpen={handleOpen} 
                        debug={true}
                        reconnect={false}
                        onclose={handleClose}
                        ref={Websocket => {
                            setRefWebsocket(Websocket)
                        }} />
                    <button className="button is-dark is-small is-outlined" type="button" onClick={handleClose}>
                        Close Connection
                    </button>
                    <AlpacaWebsocketStream isStreaming={state.isStreaming} data={state.data} />
                </div>
                :<MarketClock cookies={props.cookies}>
                    <button className="button is-dark is-small is-outlined" type="button" onClick={handleConnect}>Connect</button>
                </MarketClock>}
            </div>
        </div>
    )
}

export default withCookies(AlpacaWebsocket);