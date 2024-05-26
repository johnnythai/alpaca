import React from 'react';
import AlpacaWebsocket from './stream';

const MarketData = () => {
    return(
        <div className="container">
            <div className="box">
                <section className="hero is-small">
                    <div className="hero-body">
                        <div className="container">
                            <div className="title">
                                Market Data
                            </div>
                            <div className="MarketData">
                                <AlpacaWebsocket />
                            </div>   
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MarketData;