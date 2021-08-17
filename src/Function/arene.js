import axios from 'axios';
import { token } from './global';

export function Fn_GetPlayerList() {
    return new Promise((resolve, reject) => {
        const path = '/api/arene/defis/list'
        const headers = { headers: {"Authorization" : `Bearer ${token()}`} }

        axios.get(`${global.Link_protocol}://${global.Link_url()+path}`, headers)
            .then((res) => resolve(res.data))
            .catch((e) => {
                if (e.response) return reject(e.response.data)
                return reject('Request error: Fn_areneGetPlayerList')})
    })
}

export function Fn_getDefis() {
    return new Promise((resolve, reject) => {
        const path = '/api/arene/defis/get'
        const headers = { headers: {"Authorization" : `Bearer ${token()}`} }

        axios.get(`${global.Link_protocol}://${global.Link_url()+path}`, headers)
            .then((res) => resolve(res.data))
            .catch((e) => {
                if (e.response) return reject(e.response.data)
                return reject('Request error: Fn_getDefis')})
    })
}

export function Fn_getDefisSent() {
    return new Promise((resolve, reject) => {
        const path = '/api/arene/defis/sent'
        const headers = { headers: {"Authorization" : `Bearer ${token()}`} }

        axios.get(`${global.Link_protocol}://${global.Link_url()+path}`, headers)
            .then((res) => resolve(res.data))
            .catch((e) => {
                if (e.response) return reject(e.response.data)
                return reject('Request error: Fn_getDefisSent')})
    })
}

export function Fn_sendDefi(player) {
    return new Promise((resolve, reject) => {
        const path = '/api/arene/defis/send/'+player
        const headers = { headers: {"Authorization" : `Bearer ${token()}`} }

        axios.post(`${global.Link_protocol}://${global.Link_url()+path}`, null, headers)
            .then((res) => resolve(res.data))
            .catch((e) => {
                if (e.response) return reject(e.response.data)
                return reject('Request error: Fn_getDefis')})
    })
}