import React, { Component } from 'react';

//Component
import { Fn_Register, Fn_Login } from '../../Function/connexion'
// STYLE
import '../Styles/register.css'
// IMAGE
import goku from '../../img/perso/Son Goku/img/1.png'
import chichi from '../../img/perso/Chichi/img/1.png'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: '', email:'', password: '', password2: '',
            perso: 
            [
                {name: 'Son Goku', img: goku},
                {name: 'Chichi', img: chichi}
            ],
            listNum: 0,
            errPseudo: '', errEmail: '', errMdp: '', errMdp2: '', errRequest: ''
        };
        this.changeRegister = this.changeRegister.bind(this);
    }

    changeRegister(event) {
        const validPseudo = new RegExp(`^[A-Za-z0-9_-]*$`)
        //eslint-disable-next-line
        const validEmail = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i)
        //eslint-disable-next-line
        const validPassword = new RegExp(`^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$`)

        this.setState({[event.target.name]: event.target.value})

        // CHECK PSEUDO
        if (event.target.name === 'pseudo') {
            if (event.target.value.length === 0) {
                this.setState({errPseudo: 'Vous devez choisir un pseudo.'})
                return event.target.className = 'invalid'
            }
            else if (event.target.value.length < 3 || event.target.value.length > 19){
                this.setState({errPseudo: 'Votre pseudo doit faire entre 3 à 19 caractère.'})
                return event.target.className = 'invalid'
            } else if (!validPseudo.test(event.target.value)) {
                this.setState({errPseudo: 'Votre pseudo contient des caractères spéciaux.'})
                return event.target.className = 'invalid'
            } else {
                this.setState({errPseudo: ''})
                return event.target.className = 'valid'
            }
        }

        //CHECK EMAIL
        if (event.target.name === 'email') {
            if (event.target.value.length === 0) {
                this.setState({errEmail: 'Vous devez entrer une adresse email.'})
                return event.target.className = 'invalid'
            }
            else if (event.target.value.length < 8 || event.target.value.length > 40){
                this.setState({errEmail: 'Votre pseudo doit faire entre 3 à 19 caractères.'})
                return event.target.className = 'invalid'
            } else if (!validEmail.test(event.target.value)) {
                this.setState({errEmail: 'Vous devez entrer une adresse mail valide.'})
                return event.target.className = 'invalid'
            } else {
                this.setState({errEmail: ''})
                return event.target.className = 'valid'
            }
        }

        //CHECK PASSWORD
        if (event.target.name === 'password') {
            if (event.target.value.length === 0) {
                this.setState({errMdp: 'Vous devez entrer un mot de passe.'})
                return event.target.className = 'invalid'
            } else if (event.target.value.length < 8 || event.target.value.length > 24){
                this.setState({errMdp: 'Il vous faut entre 8 et 24 caractères.'})
                return event.target.className = 'invalid'
            } else if (validPassword.test(event.target.value)) {
                this.setState({errMdp: 'Il vous faut au moins une lettre et un chiffre.'})
                return event.target.className = 'invalid'
            } else {
                this.setState({errMdp: ''})
                return event.target.className = 'valid'
            }
        }

        //CHECK PASSWORD 2
        if (event.target.name === 'password2') {
            if (event.target.value.length === 0) {
                this.setState({errMdp2: 'Vous devez retaper votre mot de passe.'})
                return event.target.className = 'invalid'
            } else if (event.target.value !== this.state.password) {
                this.setState({errMdp2: 'Votre mot de passe est différent.'})
                return event.target.className = 'invalid'
            } else {
                this.setState({errMdp2: ''})
                return event.target.className = 'valid'
            }
        }
    }

    libraryPerso(val) {
        if (val === 'prev' && this.state.listNum > 0) return this.setState({listNum: 0})
        if (val === 'next' && this.state.listNum < this.state.perso.length) return this.setState({listNum: 1})
        return
    }

    fnSubmit = (event) => {
        event.preventDefault();
        if (this.state.errPseudo || this.state.errEmail || this.state.errMdp || this.state.errMdp2) return
       
        Fn_Register(this.state.pseudo, this.state.password, this.state.email, this.state.listNum)
            .then((res) => {
                Fn_Login(res.pseudo, res.mdp)
                    .then((token) => {this.props.handler(token)})
                    .catch((err) => {this.setState({errRequest: err})})
            })
            .catch((e) => {
                if (typeof e === 'string') return this.setState({errRequest: e})
                return console.log(e)})
    }

    ErrorReturn = () => {
        return ( this.state.errRequest ? <span className="errorMsg">{this.state.errRequest}</span> : null)
    }

    render() {
        return(
            <main className="f flexdirection_c justify_evenly align_c">
                <h1>Inscription</h1>
                <this.ErrorReturn />
                <div className="f justify_c box_shadow registerCorp">
                    <form  className="f align_c flexdirection_c justify_c" onSubmit={this.fnSubmit}>
                        <label className="f flexdirection_c">
                            Pseudo :
                            <input type="text" name='pseudo' value={this.state.pseudo} onChange={this.changeRegister} />
                            <span className="invalidText">{this.state.errPseudo}</span>
                        </label>
                        <label className="f flexdirection_c">
                            Adresse mail :
                            <input type="email" name='email' value={this.state.email} onChange={this.changeRegister} />
                            <span className="invalidText">{this.state.errEmail}</span>
                        </label>
                        <label className="f flexdirection_c">
                            Mot de passe :
                            <input type="password" name='password' value={this.state.password} onChange={this.changeRegister} />
                            <span className="invalidText">{this.state.errMdp}</span>
                        </label>
                        <label className="f flexdirection_c">
                            Retaper mot de passe :
                            <input type="password" name='password2' value={this.state.password2} onChange={this.changeRegister} />
                            <span className="invalidText">{this.state.errMdp2}</span>
                        </label>
                        <br />
                        <input type="submit" value="S'inscrire" />
                    </form>
                    <div className="f flexdirection_c align_c perso">
                        <span>Votre personnage:</span>
                        <img src={this.state.perso[this.state.listNum].img} alt={this.state.perso[this.state.listNum].name} />
                        <div className="persoDesc">
                            <button className="register_button" onClick={() => this.libraryPerso('prev')}>◄</button>
                            <p>{this.state.perso[this.state.listNum].name}</p>
                            <button className="register_button" onClick={() => this.libraryPerso('next')}>►</button>
                        </div>
                        
                    </div>
                    
                </div>
            </main>
        )
    };
}

export default Register;