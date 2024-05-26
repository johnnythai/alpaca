import React, { useState, useEffect, Component } from 'react';

import AccountDisplay from './account/account';
import PositionDisplay from './position/position';
import ActivityDisplay from './activity/activity';
import PortfolioDisplay from './portfolio/portfolio';

import FetchAPI from './fetch';
import { withCookies } from 'react-cookie';


const Tab = (props) => {
    const [account, setAccount] = useState(null)
    const [activity, setActivity] = useState(null)
    const [position, setPosition] = useState(null)
    const [portfolio, setPortfolio] = useState(null)

    const handleClick = (tabName) => {
        if (tabName === 'Portfolio') {
            setPortfolio(null)
        } else if (tabName === 'Position') {
            setPosition(null)
        } else if (tabName === 'Account Activity') {
            setActivity(null)
        } else {
            setAccount(null)
        }
    }

    const setTab = (tabName, data) => {
        if (tabName === 'portfolio') {
            setPortfolio(data)
        } else if (tabName === 'positions') {
            setPosition(data)
        } else if (tabName === 'activity') {
            setActivity(data)
        } else {
            setAccount(data)
        }
    }

    const handleFetch = (e, tabName, url) => {
        e.preventDefault()
        try {
            (FetchAPI(url, props.cookies, e)
                .then(result => {
                    if (result !== undefined) {
                        result instanceof Error
                        ? alert(result)
                        : setTab(tabName, result)
                    }
                })
            )
        } 
        
        catch {
            let err = new Error(' Please log in.')
            alert(err)
        }
    }

    return(
        <div className="container"> 
            {
                props.currentTab === 'portfolio' 
                ? <PortfolioDisplay onFetch={handleFetch} data={portfolio} handleClick={handleClick} />
                : props.currentTab === 'positions' 
                ? <PositionDisplay onFetch={handleFetch} data={position} handleClick={handleClick} /> 
                : props.currentTab === 'activity' 
                ? <ActivityDisplay onFetch={handleFetch} data={activity} handleClick={handleClick} /> 
                : <AccountDisplay onFetch={handleFetch} data={account} handleClick={handleClick} />
            }
        </div>
     )
}

const DashboardNav = (props) => {
    const [currentTab, setCurrentTab] = useState('account')

    const handleClick = (e) => {
        e.preventDefault()
        document.getElementById('account').classList.remove('is-active')
        document.getElementById('positions').classList.remove('is-active')
        document.getElementById('activity').classList.remove('is-active')
        document.getElementById('portfolio').classList.remove('is-active')
        setCurrentTab(e.target.value)

    }

    useEffect(() => {
        document.getElementById(currentTab).classList.add('is-active')
    })

    return(
        <div className="container">
            <div className="box"  style={{ minHeight: '50vh' }}>
                <section className="hero is-small">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns">
                                <div className="column is-one-quarter">
                                    <div><strong>Dashboard</strong></div>
                                    <br/>
                                    <div className="buttons">
                                        <button className="button is-fullwidth is-rounded is-active" id="account" value="account" onClick={handleClick}>Account Info</button>
                                        <button className="button is-fullwidth is-rounded" id="positions" value="positions" onClick={handleClick}>Positions</button>
                                        <button className="button is-fullwidth is-rounded" id="activity" value="activity" onClick={handleClick}>Activity</button>
                                        <button className="button is-fullwidth is-rounded" id="portfolio" value="portfolio" onClick={handleClick}>Portfolio</button>
                                    </div>
                                </div>
                                <div className="column is-three-quarters ml-4">
                                    <Tab currentTab={currentTab} cookies={props.cookies} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

const Dashboard = (props) => {
    return(
        <div className="Dashboard">
            <DashboardNav cookies={props.cookies} />
        </div>
    )
}

export default withCookies(Dashboard);