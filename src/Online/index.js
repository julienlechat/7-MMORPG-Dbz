import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/fr'

  // STYLE
import './Styles/index.css'
// IMAGE
import LogoIMG from '../img/logo.png'

//Function
import '../Function/global'
import { setError, token } from '../Function/global'
import { Fn_Connected } from '../Function/connexion'

// Component
import Accueil from './Components/accueil'
import Perso from './Components/perso'
import Persos from './Components/persos'
import PersoLive from './Components/persoLive'
import Monde from './Components/monde'
import Arene from './Components/arene'

// Admin Cpnt
import Admin from '../Admin/index'
import AdminAccueil from '../Admin/Components/accueil'
import { AdminGetActu, AdminAddActu } from '../Admin/Components/news'
import { AdminGetPersos } from '../Admin/Components/personnages'


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        try {
            if (!token()) return this.props.handler()
            this.updateCompteur()
            this.setState({date: moment().locale("fr").format('LLLL').charAt(0).toUpperCase() + moment().locale("fr").format('LLLL').slice(1)})
            this.timer = window.setInterval(this.updateCompteur.bind(this), 60000*2)
            this.dateTimer = window.setInterval(this.updateDate.bind(this), 1000)
        } catch (e) {this.props.handler()}
    }

    componentWillUnmount() {
        if (this.timer) window.clearInterval(this.timer)
        if (this.dateTimer) window.clearInterval(this.dateTimer)
    }

    componentDidUpdate() {
        try {
            if (global.error && typeof global.error.errorMsg === 'string') {
                this.setState(global.error)
                global.error = null
                window.setTimeout(() => {this.setState({errorMsg: '', errorColor: ''})}, 4000)
            }
            if (this.state.errorMsg === 'token invalid') {
                global.error = null
                return this.props.handler()
            }
        } catch(e) { return console.log(e)}
    }

    /* Reçois les infos de 'persoLive' */
    persoInfosReceive(perso) {
        try {
            if (!perso && typeof perso !== 'object') return
            if (perso.change) this.setState({newPerso: false})
            return this.setState({perso: perso})
        } catch(e) {setError('Erreur pendant le chargement du personnage.')}
    }

    /* Affiche l'icone + nom perso dans la nav */ 
    monPerso() {
        try {
            var img = require(`../img/perso/${this.state.perso.nom}/sprite/${this.state.perso.dos}/ico.gif`)
            return <Link className="f justify_c" to="/perso"><img className="mr-5" src={img ? img.default : null} alt={this.state.perso.nom}/>{this.state.perso.nom}</Link>
        } catch { return <Link to="/perso">Perso</Link> }
    }

    /* Compteur */
    updateDate() {
        var date = moment().locale("fr").format('LLLL')
        this.setState({date: date.charAt(0).toUpperCase() + date.slice(1)})
    }
    updateCompteur() {
        Fn_Connected()
            .then((res) => this.setState(res))
            .catch((e) => setError(e))
    }

    /* Error */
    showError () {
        const { errorMsg, errorColor } = this.state
        return (
            <span className={`f align_c errorMsg ${errorColor ? errorColor : null}`}>
                <div className="f flex1 align_c">
                    <i className="fal fa-exclamation-square errorMsg_Icone"></i>
                    {errorMsg}
                </div>
                <button className={`f align_c justify_c errorMsg ${errorColor ? errorColor : null} errorMsg_close`} onClick={() => this.setState({errorMsg: '', errorColor: ''})}><i className="fas fa-times"></i></button>
            </span>)
    }

    render() {
        const { date, connected, role, newPerso, perso } = this.state 
        return (
            <Router>
                <main className="box_shadow_connected main_fullpage f justify_stretch flexdirection_c header_connected">
                    <header className="f flexdirection_c">
                        <img src={LogoIMG} className="header_logo" alt="logo" />
                            <nav className="header_nav">
                                <span className="f align_c font_poppins cpt_heure">{date}</span>
                                <ul className="f justify_c nav_connected">
                                    <li><Link to="/news">Accueil</Link></li>
                                    <li>{this.monPerso()}</li>
                                    <li><Link to="/persos">Mes persos</Link></li>
                                    <li><Link to="/carte" >Carte</Link></li>
                                    <li><Link to="/">Compte</Link></li>
                                    <li><a href="/" className="disconnectButton" onClick={() => this.props.handler()} >Déconnexion</a></li>
                                </ul>
                                <span className="f align_c font_poppins cpt_connect">{connected > 1 ? connected+' joueurs en ligne' : connected+' joueur en ligne'}</span>
                            </nav>
                    </header>

                    <div className='f flexdirection_c align_c main_content flex1'>
                        <div className="f justify_c width_100 height_100">
                             {/*Menu Gauche */}
                             <Routes>
                                 <Route path="/admin/*" element={null} />
                                 <Route path="*" element={<PersoLive perso={(p) => this.persoInfosReceive(p)} newPerso={newPerso} />} />
                             </Routes>
                             

                             {/*Content principal */}
                            <div className="f flex1 flexdirection_c align_c">
                            {this.state.errorMsg ? this.showError() : null}
                                <Routes>
                                    {/*Espace connecté */}
                                    <Route path="/news" element={<Accueil />} />
                                    <Route path="/perso" element={<Perso />} />
                                    <Route path="/persos" element={<Persos changePerso={() => this.setState({newPerso: true})} />} />
                                    <Route path="/carte" element={<Monde changePos={() => this.setState({newPerso: true})} />} />
                                    <Route path="/arene" element={<Arene perso={perso} />} />

                                    {/* PANEL ADMIN */}
                                    <Route path="/admin" element={<Admin />} >
                                        <Route path="/" element={<AdminAccueil />} />
                                        <Route path="/news">
                                            <Route path="/" element={<AdminGetActu />} />
                                            <Route path="add" element={<AdminAddActu />} />
                                        </Route>
                                        <Route path="/persos">
                                            <Route path="/" element={<AdminGetPersos />} />
                                        </Route>
                                    </Route>

                                    {/* Si le lien n'existe pas. */}
                                    <Route path="*" element={<Navigate to='/news'/>} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                    <footer className="f justify_c flexdirection_c align_c footer footer_connected">
                        { role ? <Link className="footer_button_panelAdmin" to="/admin">Panel Admin</Link> : null}
                        <p>© Development by Julien Lechat | Projet 2021</p>
                    </footer>
                </main>
            </Router>
        );
    }
}

export default Index;