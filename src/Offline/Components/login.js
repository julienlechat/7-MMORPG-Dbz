import React, { Component } from 'react';
// Style
import '../Styles/login.css'
// Component
import { Fn_Login } from '../../Function/connexion'

/*
    Login Page
*/

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pseudo: '',
            mdp: '',
            errorMsg: ''
        }
        this.infoChange = this.infoChange.bind(this);
    }

    // Change la couleur des bordures
    infoChange(e) {
        this.setState({[e.target.name]: e.target.value})

        if (e.target.value.length < 3) return e.target.className = 'invalid'
        return e.target.className = 'valid'
    }

    // Envoie les informations au Back-end
    fnSubmit = (e) => {
        e.preventDefault();
        Fn_Login(this.state.pseudo, this.state.mdp)
            .then((token) => {this.props.handler(token)})
            .catch((err) => {this.setState({errorMsg: err})})
    }

    // Affiche les erreurs
    ErrorReturn = () => {
        return (this.state.errorMsg ? <span className="errorMsg">{this.state.errorMsg}</span> : null)
    }

    render() {
        return (
            <main className="f flexdirection_c justify_evenly align_c">
                <h1>Connexion</h1>
                <this.ErrorReturn />
                <div className="f justify_c box_shadow loginCorp">
                    <form  className="f align_c flexdirection_c" onSubmit={this.fnSubmit}>
                        <label className="f flexdirection_c">
                            Pseudo :
                            <input type="text" name="pseudo" value={this.state.pseudo} onChange={this.infoChange} />
                        </label>
                        <label className="f flexdirection_c">
                            Mot de passe :
                            <input type="password" name="mdp" value={this.state.mdp} onChange={this.infoChange} />
                        </label>
                        <br />
                        <input type="submit" value="Connexion" />
                    </form>
                </div>
            </main>
        );
    }
    
}

export default Login;