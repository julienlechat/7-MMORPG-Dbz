import React, { Component } from 'react'

// Style
import '../Styles/perso.css'
// Image
import background from '../../img/perso/background.png'
//Function
import { setError } from '../../Function/global'
import { Fn_MonPerso } from '../../Function/perso'

class Perso extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        try {
            Fn_MonPerso()
                .then((res) => this.setState(res))
                .catch((e) => setError(e))
        } catch (e) {setError(e)}
    }

    imgPerso(perso, level) {
        try {
            var img = require(`../../img/perso/${perso}/img/${level}.png`)
            return <img className="perso_img" src={img.default} alt={perso} />
        } catch(e) { return <p>No IMG</p> }
    }
    persoExp () {
        try {
            var { experience, maxexp } = this.state
            var expPourcent = experience*100/maxexp

            return <div className="mt-5 width_70 progress"><div className="progress-bar bg-warning" style={{width: expPourcent+'%'}}></div></div>
        } catch(e) {return <div className="mt-5 width_70 progress"><div className="progress-bar bg-warning" style={{width: '100%'}}></div></div>}
    }

    render() {
        const { nom, level, experience, maxexp, force, defense, energie, vitesse, intelligence, victoires, defaites } = this.state
        return (
        <div  className="f flexdirection_c align_c">
            <div className="f perso_div mt-30">
                {/* Background */}
                <div className="f perso_background_div"> 
                    <img className="perso_background" src={background} alt="background" />
                    {this.imgPerso(nom, level)}
                </div>
                {/* Description */}
                <div className="f justify_stretch align_c flexdirection_c perso_desc">
                    <h1 className="f justify_c perso_title">{nom}</h1>
                    <h1 className="f justify_c perso_level">Niveau {level}</h1>
                    {/* ProgressBar */}
                    {this.persoExp()}
                    <span className="perso_exp font_poppins mt-5">Éxpérience ({experience+'/'+maxexp})</span>
                    <div className="f height_100 width_100 justify_spaceb perso_infos">
                        <div className="f flexdirection_c justify_c">
                            <span className="f align_c font_poppins perso_carac"><div className="perso_ico"><i className="fal fa-fist-raised"></i></div>Force: {force}</span>
                            <span className="f align_c font_poppins perso_carac"><div className="perso_ico"><i className="fal fa-shield"></i></div> Defense: {defense}</span>
                            <span className="f align_c font_poppins perso_carac"><div className="perso_ico"><i className="fal fa-fire"></i></div> Energie: {energie}</span>
                            <span className="f align_c font_poppins perso_carac"><div className="perso_ico"><i className="fal fa-rabbit-fast"></i></div> Vitesse: {vitesse}</span>
                            <span className="f align_c font_poppins perso_carac"><div className="perso_ico"><i className="fal fa-brain"></i></div> Intelligence: {intelligence}</span>
                        </div>
                        <div className="f flexdirection_c justify_c">
                            <span className="f align_c font_poppins perso_carac"><div className="perso_ico2"><i className="fal fa-check"></i></div>{victoires > 1 ? 'Victoires: '+victoires : 'Victoire: '+victoires}</span>
                            <span className="f align_c font_poppins perso_carac"><div className="perso_ico2"><i className="fal fa-times"></i></div>{defaites > 1 ? 'Défaites: '+defaites : 'Défaite: '+defaites}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Perso;