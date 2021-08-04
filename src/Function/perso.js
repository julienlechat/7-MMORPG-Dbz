import axios from 'axios';

/*
    'Mon perso' request
*/
export function Fn_MonPerso() {
    return new Promise((resolve, reject) => {
        const path = '/api/perso/info'
        const token = localStorage.getItem('token')
        const headers = { headers: {"Authorization" : `Bearer ${token}`} }

        axios.get(`${global.Link_protocol}://${global.Link_url()+path}`, headers)
            .then((res) => resolve(res.data))
            .catch((err) => {
                if (err.response) return reject(err.response.data)
                return reject('Request error: Fn_MonPerso')})
        
    })
}

/*
    'Mes persos' request
*/
export function Fn_MesPersos() {
    return new Promise((resolve, reject) => {
        const path = '/api/perso/infos'
        const token = localStorage.getItem('token')
        const headers = { headers: {"Authorization" : `Bearer ${token}`} }

        axios.get(`${global.Link_protocol}://${global.Link_url()+path}`, headers)
            .then((res) => resolve(res.data))
            .catch((err) => {
                if (err.response) return reject(err.response.data)
                return reject('Request error: Fn_MesPersos')})
    })
}

/*
    Change de perso
*/
export function Fn_changePerso(key) {
    return new Promise((resolve, reject) => {
        const path = '/api/perso/change/'+key
        const token = localStorage.getItem('token')
        const headers = { headers: {"Authorization" : `Bearer ${token}`} }

        axios.put(`${global.Link_protocol}://${global.Link_url()+path}`, {}, headers)
            .then((res) => {
                if (res.status === 204) resolve('nochange')
                resolve(res.data)
            })
            .catch((err) => {
                if (err.response) return reject(err.response.data)
                return reject('Request error: Fn_changePerso')})

    })

}

/*
    Retourne l'état du joueur
*/
export function etatPerso(etat) {
    var etatObj
    if (etat === 0) etatObj = {etat:'Mort', color: 'color_red'}
    if (etat === 1) etatObj = {etat:'Vivant', color: 'color_green'}
    if (!etatObj) throw new Error('vide')
    return <p className={`font_poppins menug_etat color_grey ${etatObj.color}`}>{etatObj.etat}</p>
}


/*
    Retourne la vie MAX
*/
export function lifeMaxPerso(level, defense, intelligence) {
    try {
        return Math.round(10+(level*1.2)+(defense*1.5)+(intelligence*0.5))
    } catch (e) {return 10}
}

/*
    Retourne la barre de vie
*/
export function Progress_lifePerso(level, defense, intelligence, vie, classp) {
    try {
        if (isNaN(level, defense, intelligence, vie)) throw new Error('NaN')
        var vieMax = Math.round(10+(level*1.2)+(defense*1.5)+(intelligence*0.5))
        var viePourcent = vie*100/vieMax

        return (
            <div className="width_100 progress">
                <div className={`progress-bar ${viePourcent > 30 ? 'bg-green' : 'bg-red'} ${classp ? classp : ''}`} style={{width: viePourcent + '%' }}></div>
            </div>)
    } catch(err) {
        return (<div className="width_100 progress"><div className={`progress-bar bg-green ${classp ? classp : ''}`} style={{width: '100%'}}></div></div>)
    }
}

/*
    Retourne la barre d'exp
*/
export function Progress_expPerso (exp, maxexp, classp) {
    try {
        if (isNaN(exp, maxexp)) throw new Error('NaN')
        var expPourcent = exp*100/maxexp

        return (<div className="width_100 progress">
                    <div className={`progress-bar bg-warning  ${classp ? classp : ''}`} style={{width: expPourcent+'%'}}></div>
                </div>)

    } catch(err) {
        return (<div className="width_100 progress"><div className={`progress-bar bg-warning  ${classp ? classp : ''}`} style={{width: '100%'}}></div></div>)
    }
}