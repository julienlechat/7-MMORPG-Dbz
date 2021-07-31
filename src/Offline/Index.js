import React, { Component }  from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";

// STYLE
import './Styles/index.css';
// COMPONENT
import Accueil from './Components/accueil';
import Register from './Components/register'
import Login from './Components/login'

import logobrut from '../img/logobrut.png'


/*
    Index Offline
        -> Accueil
        -> Register
        -> Login
*/

class Index extends Component {

    // Connecte le joueur avec le token reçu
    handler_connect = (token) => {
        if (!token) return
        localStorage.setItem('token', token)
        this.props.handler()
    }

    render() {
        if (!this.props.connected) return (
            <Router>
                <div className="main box_shadow index_body_page f flexdirection_c flex1">
                    <header className="f justify_spaceb header_hl">
                        <Link to="/" className="header_logo_offline f">
                            <img className="logo_offline" src={logobrut} alt="logo" />
                        </Link>
                        <nav className="f align_c header_nav">
                            <ul>
                                <li><Link to="/login">Connexion</Link></li>
                                <li><Link to="/register">Inscription</Link></li>
                            </ul>
                        </nav>
                    </header>

                    <Routes>
                        <Route path="/" element={!this.props.connected ? <Accueil /> : null} />
                        <Route path="/register" element={!this.props.connected ? <Register handler={(token) => this.handler_connect(token)} /> : <Navigate to='/'/>} />
                        <Route path="/login" element={!this.props.connected ? <Login handler={(token) => this.handler_connect(token)} /> : <Navigate to='/'/>} />

                        {/* A voir (celui online et offline doivent être lier, provoque erreur) */}
                        <Route path="*" element={<Navigate to='/'/>} />
                    </Routes>
                    
                    <footer className='f justify_c footer'>
                        <p>© Development by Julien Lechat | Projet 2021</p>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default Index;
