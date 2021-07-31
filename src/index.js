import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { token } from './Function/global';

// STYLE
import './index.css';
//COMPONENT
import IndexOffline from './Offline/Index'
import IndexOnline from './Online/index'


class CheckConnected extends Component {
    constructor(props) {
        super(props)
        this.state = {connected: false, loaded: false}
    }

    componentDidMount() {
        if (token()) return this.setState({connected: true, loaded: true})
        return this.setState({loaded: true})
    }

    OnChangeState() {
        if (!this.state.connected) return this.setState({connected: true})
        if (token()) localStorage.removeItem('token')
        this.setState({connected: false})
    }

    onLoaded () {
        if (this.state.connected) return <IndexOnline handler={() => this.OnChangeState()} />
        return <IndexOffline handler={() => this.OnChangeState()} connected={this.state.connected} />
    } 

    render() {
        return (this.state.loaded ? this.onLoaded() : <h1>Chargement</h1>)
    }
}

export default CheckConnected


ReactDOM.render(
    <React.StrictMode>
        <CheckConnected />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
