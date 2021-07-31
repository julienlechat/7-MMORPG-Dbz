import { isExpired, decodeToken } from "react-jwt";

/*
    Link
*/
global.Link_protocol = 'http'
global.Link_url = () => {
    const LOCAL_DOMAINS = ["localhost", "127.0.0.1", "192.168.1.26"];
    const PUBLIC_BACKEND = ["localhost"]
    const PORT = '3000'
    if (LOCAL_DOMAINS.includes(window.location.hostname)) return window.location.hostname + ':' + PORT
    return PUBLIC_BACKEND + ':' + PORT
}

/*
    Erreur
*/
export function setError(error, color) {
    if (!error) return
    if (typeof error !== 'string') return console.log(error)
    if (color && typeof color !== 'string') return console.log(error)
    return global.error = color ? {errorMsg: error, errorColor: color} : {errorMsg: error, errorColor: ''}
}

/*
    Token
*/
export function token() {
    if (localStorage.getItem('token')) return localStorage.getItem('token')
    return false
}

/*
    Decode le token
*/
export function tokenDecrypt() {
    const token = localStorage.getItem('token')
    if (typeof token !== 'string') throw new Error ('token invalid');
    if (!token) throw new Error ('token invalid');

    const TokenDecoded = decodeToken(token);

    if (isExpired(token)) throw new Error ('token invalid');
    if (!TokenDecoded.userId) throw new Error ('token invalid');
    if (isNaN(TokenDecoded.role)) throw new Error ('token invalid');

    return ({
        token: token,
        decodedToken: TokenDecoded
    })
}
