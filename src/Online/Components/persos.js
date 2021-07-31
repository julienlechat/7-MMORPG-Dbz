import React, { Component } from 'react'

import { setError } from '../../Function/global'
import { Fn_MesPersos, Fn_changePerso, lifeMaxPerso, Progress_lifePerso, Progress_expPerso, etatPerso } from '../../Function/perso'
import '../Styles/persos.css'

class Persos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            persosAnim: []
        }
    }

    componentDidMount() {
        try {
            Fn_MesPersos()
                .then((res) => {this.setState({listPersos: res})})
                .catch((e) => setError(e))
        } catch (e) {setError(e)}
    }

    changePerso(key) {
        try {
            Fn_changePerso(key)
                .then((res) => {
                    if (res === 'nochange') return
                    this.props.changePerso(true)
                })
                .catch((e) => setError(e))
        } catch (e) {setError(e)}
    }

    etatPerso(etat) {
        try {
            return etatPerso(etat)
        } catch(e) {return null}
    }

    imgPerso(key, persoName) {
        try {
            const { persosAnim } = this.state
            var img = require(`../../img/perso/${persoName}/sprite/0/0.png`)
            var imgwait = require(`../../img/perso/${persoName}/sprite/0/wait.gif`)

            if (key >= persosAnim.length) persosAnim.push(1)

            var AnimPerso = () => {
                var newState = persosAnim
                newState.splice(key, 1, 2)
                this.setState({persosAnim : newState})
            }
            var RemoveAnimPerso = () => {
                var newState = persosAnim
                newState.splice(key, 1, 1)
                this.setState({persosAnim : newState})
            }

            return <img key={key} src={persosAnim[key] === 1 ? img.default : imgwait.default} onMouseEnter={() => AnimPerso()} onMouseLeave={() => RemoveAnimPerso()} alt="test" />
        } catch(e) { return <p>No IMG</p> }
    }

    listPersos () {
        try {
            return this.state.listPersos.map((value, key) => {
                return (
                    <fieldset key={key} className="f justify_c flexdirection_c align_c persos_div">
                        <legend className="persos_nom"><div role="button" className="font_poppins persos_link" onClick={() => this.changePerso(value.id)}>{value.nom}</div></legend>
                        <div role="button" className="persos_link"  onClick={() => this.changePerso(value.id)}>{this.imgPerso(key, value.nom)}</div>
                        {this.etatPerso(value.etat)}
                        <p className="font_poppins color_grey persos_level mt-5">~ Niveau {value.level} ~</p>
                        <p className="font_poppins menug_exp mt-15">Experience ({value.experience + '/' + value.maxexp})</p>
                        {Progress_expPerso(value.experience, value.maxexp)}
                        <p className="font_poppins menug_exp mt-10">Vie ({value.vie + '/' + lifeMaxPerso(value.level, value.defense, value.intelligence)})</p>
                        {Progress_lifePerso(value.level, value.defense, value.intelligence, value.vie)}
                    </fieldset>)
            })
        } catch(e) {return <p>No persos</p>}
    }

    render() {
        return (
        <div className="f align_c flexdirection_c">
            <h1>Mes persos</h1>
            <div className="f">
                {this.listPersos()}
            </div>
        </div>)
    }

}

export default Persos;