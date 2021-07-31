import React, { Component } from 'react'

//Function
import { setError } from '../../Function/global'
import { Fn_loadCarte, Fn_changePosition } from '../../Function/carte'

import '../Styles/monde.css'
import fleche from '../../img/carte/fleche.png'

class Monde extends Component {

    /*
        Etat 0: MORT
        Etat 1: VIVANT
        ---
        Position: 1
    */
   constructor(props) {
       super(props)
       this.state = {}
   }
   componentDidMount() {
        try {
            Fn_loadCarte()
                .then((res) => this.setState({carte: res}))
                .catch((e) => setError(e))
       } catch(e) {setError(e)}
   }

   changePos(pos) {
       try {
            Fn_changePosition(pos)
                .then((res) => { 
                    this.props.changePos(true)
                    setError(`Vous êtes désormais à ${this.state.carte[pos].name} !`, 'alert-success')
                })
                .catch((e) => setError(e))
                
       } catch(e) {setError(e)}
   }

   getCarte() {
       try {
            const { etat } = this.state.carte[0]
            const background = require(`../../img/carte/${etat}.png`)
            return (
                <div className="carte_imgdiv">
                    <img className="carte_img" src={background.default} alt="carte" />

                    {this.state.carte.map((value, key) => {
                        const imgpos = require(`../../img/carte/position/${etat}/${value.cposition}.png`)
                        return (
                            <div key={key} className=" f flexdirection_c carte_img_div" style={{ top: value.x, left: value.y}} onClick={() => this.changePos(value.cposition)}>
                                <div className="f justify_c carte_fleche">
                                    <img src={fleche} alt="fleche"/>
                                </div>
                                <img className="carte_pos" src={imgpos.default} alt={value.name} />
                            </div>
                        )
                    })}
                </div>)
       } catch(e) { return <p>Error</p>}
   }

    render() {
        return (
            <div className="f align_c flexdirection_c">
                <h1>Carte</h1>
                {this.getCarte()}
            </div>
        )
    }
}

export default Monde;