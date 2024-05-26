import React, { Component } from 'react';
import '../scss/styles.scss'

const HomeBody = () => {
    return(
        <div className="home-body">
            <br /> This web app was built to interact with the Alpaca paper trading api and is used to display market data.
            This Alpaca paper trading account is owned by Johnny Thai and is used for educational purposes only.<br /> 
            <br /> Log in to get access to all features.
            <br /> username: user1
            <br /> password: mintchip1
        </div>
    )
}

const Home = () => {
    return(
        <div className="container">
            <section className="hero is-medium">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">
                            Welcome! 
                        </p>
                    </div>
                </div>
            </section>
            <HomeBody />
        </div>
    );
}

export default Home;
