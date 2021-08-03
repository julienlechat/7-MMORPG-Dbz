import axios from 'axios';
import { decodeToken } from "react-jwt";
import { token } from './global';

/*
    Reçois les actualités
*/
export function loadNews() {
    return new Promise((resolve, reject) => {
        const path = '/api/news/get'
        axios.get(`${global.Link_protocol}://${global.Link_url()+path}`)
            .then((res) => {return resolve(res.data)})
            .catch((err) => {
                if (err.response) return reject(err.response.data)
                return reject('Request error: loadNews')})
    })
}

/*
    Supprime une actualité
*/
export function deleteNews(id) {
    return new Promise((resolve, reject) => {
        const path = '/api/admin/news/delete/'+id
        const tokenDecoded = decodeToken(token())
        const headers = { headers: {"Authorization" : `Bearer ${token()}`} }

        if (tokenDecoded.role === 0) reject('Access denided')

        axios.delete(`${global.Link_protocol}://${global.Link_url()+path}`, headers)
            .then((res) => {return resolve(res.data)})
            .catch((err) => {
                if (err.response) return reject(err.response.data)
                return reject('Request error: deleteNews')})
    })
}
/*
    Ajouter une actualité
*/
export function addNews(title, content) {
    return new Promise((resolve, reject) => {
        const path = '/api/admin/news/add'
        const tokenDecoded = decodeToken(token())
        const headers = { headers: {"Authorization" : `Bearer ${token()}`} }

        if (tokenDecoded.role === 0) reject('Access denided')
            axios.post(`${global.Link_protocol}://${global.Link_url()+path}`, {
                title: title,
                content: content
            }, headers)
                .then((res) => {return resolve(res.data)})
                .catch((err) => {
                    if (err.response) return reject(err.response.data)
                    return reject('Request error: addNews')})
    })
}