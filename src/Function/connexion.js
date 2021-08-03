import axios from 'axios';
import { tokenDecrypt } from './global';


/*
    Login Request
*/
export function Fn_Login(pseudo, pass) {
    return new Promise((resolve, reject) => {
        const path = '/api/auth/login'
        if (pseudo.length < 3 || pass.length < 3) return reject('Pseudo et/où mot de passe invalide.')

        axios.post(`${global.Link_protocol}://${global.Link_url()+path}`, {
                    pseudo: pseudo, mdp: pass })
            .then((res) => resolve(res.data.token))
            .catch((e) => {
                if (e.response) return reject(e.response.data)
                return reject('Request error: Fn_Login')})
    })
}

/*
    Register Request
*/
export function Fn_Register(pseudo, pass, email, perso) {
    return new Promise((resolve, reject) => {
        const path = '/api/auth/signup'
        if (!pseudo || !email || !pass) throw new Error ('Un ou plusieurs champ(s) est invalide.')

        axios.post(`${global.Link_protocol}://${global.Link_url()+path}`, {
                   pseudo: pseudo, mdp: pass, email: email, perso: perso})
            .then((res) => resolve(res.data))
            .catch((err) => {
                if (err.response) return reject(err.response.data)
                return reject('Request error: Register')})
    })
}

/*
    Envoie status connecté, reçoit la liste
*/
export function Fn_Connected() {
    return new Promise((resolve, reject) => {
        const path = '/api/auth/connected'
        const token = tokenDecrypt()

        axios.get(`${global.Link_protocol}://${global.Link_url()+path}`, { headers: {"Authorization" : `Bearer ${token.token}`} })
            .then((res) => {
                return resolve({
                    userId: token.decodedToken.userId,
                    role: token.decodedToken.role,
                    connected: res.data.connected
                })
            })
            .catch((err) => {
                if (err.response) return reject(err.response.data)
                return reject('Request error: fn_connected')
            })
    })
}