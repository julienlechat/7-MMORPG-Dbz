import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { setError } from '../../Function/global'
import { Fn_MonPerso, Progress_lifePerso, Progress_expPerso, lifeMaxPerso, etatPerso } from '../../Function/perso'
import { Fn_getPosition } from '../../Function/carte'

class PersoLive extends Component {

    constructor(props) {
        super(props)
        this.state = {
            persoImgAnim: true,
        }
    }

    componentDidMount() {
        try { this.loadPerso(false)
        } catch (e) {setError(e)}
    }

    componentDidUpdate() {
        try { if (this.props.newPerso) this.loadPerso(true)
        } catch (e) {setError(e)}
    }

    loadPerso(change) {
        Fn_MonPerso()
            .then((res) => {
                const obj = {...res, viemax: lifeMaxPerso(res.level, res.defense, res.intelligence)}
                this.setState(obj)
                this.props.perso(change ? {...obj, change: change} : obj)
                this.loadLieu()
            })
            .catch((e) => setError(e)
            )
    }

    loadLieu() {
        Fn_getPosition()
            .then((res) => {this.setState({lieu: res})})
            .catch((e) => setError(e))
    }

    etatPerso(etat) {
        try { return etatPerso(etat)
        } catch(e) { return null}
    }

    persoImg () {
        try {
            const { nom, dos, persoImgAnim } = this.state
            if (nom.length > 1 && typeof (dos) !== 'undefined') {
                const img = require(`../../img/perso/${nom}/sprite/${dos}/0.png`)
                const imgwait = require(`../../img/perso/${nom}/sprite/${dos}/wait.gif`)

                return <img src={persoImgAnim ? img.default : imgwait.default} onMouseEnter={() => this.setState({persoImgAnim: false})} onMouseLeave={() => this.setState({persoImgAnim: true})} alt={nom} />
            }
            throw new Error()
        } catch(e) {return <p>NoIMG</p>}
    }


    render() {
        const { nom, level, experience, maxexp, vie, viemax, defense, intelligence, etat, carteName } = this.state
        return (
            <div className="f flexdirection_c menug">
                <fieldset className="f flexdirection_c align_c menug_div">
                    <legend className="menug_pseudo"><Link className="font_poppins menug_pseudo_link" to="/perso">{nom}</Link></legend>
                    <Link to="/perso">{this.persoImg() || 'No IMG'}</Link>
                    {this.etatPerso(etat)}
                    <p className="color_grey font_poppins menug_title mt-5">~ Niveau {level} ~</p>
                    <div className="f flexdirection_c width_100">
                        <p className="font_poppins menug_exp mt-15">Experience ({experience + '/' + maxexp})</p>
                        {Progress_expPerso(experience, maxexp)}

                        <p className="font_poppins menug_exp mt-10">Vie ({vie + '/' + viemax})</p>
                        {Progress_lifePerso(level, defense, intelligence, vie)}
                    </div>
                </fieldset>

                <fieldset className="f flexdirection_c align_c menug_div mt-30">
                    <legend className="menug_pseudo"><Link className="font_poppins menug_pseudo_link" to="/carte">{carteName}</Link></legend>

                    {this.state.lieu ? this.state.lieu.map((value, key) => {
                       return <Link key={key} to={`/${value.page}`} className="menug_lien menug_title mt-5">- {value.name}</Link>
                    }) : null
                    }
                </fieldset>
            </div>
        )
    }
}

export default PersoLive;