import React, { Component } from 'react'
import '../Styles/arene.css'

import { setError } from '../../Function/global'
import { Fn_GetPlayerList, Fn_getDefis } from '../../Function/arene'

class Arene extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        try {
            this.loadPlayerList()
            this.loadDefisList()
        } catch(e) {setError(e)}
        
    }

    // Check l'Etat et la Position du joueur pour déterminer s'il est bien dans l'arène
    checkPlayerArene() {
        try {
            const { etat, position } = this.props.perso
            if (etat === 1 && position === 0) return true
            return false
        } catch(e) {return false}
    }

    // Envoie un défi
    sendDefi() {
        try {
            
        } catch(e) {setError(e)}
    }

    // Charge la liste des joueurs
    loadPlayerList() {
        Fn_GetPlayerList()
            .then((res) => { 
                this.setState({players: res})
                console.log(res) })
            .catch((e) => setError(e))
    }

    // Charge la liste des défis
    loadDefisList() {
        Fn_getDefis()
            .then((res) => { 
                this.setState({defis: res})
                console.log(res) })
            .catch((e) => setError(e))
    }

    // Affiche la liste des joueurs
    listPlayer() {
        try {
            const { players } = this.state
            const playersList = []

            players.forEach((player, key) => {
                playersList.push(
                    <tr key={key} className="font_poppins">
                        <th><b>{player.pseudo}</b> [{player.nom}]</th>
                        <th><b>{player.level}</b></th>
                        <th>GO</th>
                    </tr>)
            })

            return (
                <table className="arene_table">
                    <thead>
                        <tr>
                            <th>Joueur</th>
                            <th>Niveau</th>
                            <th>Combattre</th>
                        </tr>
                    </thead>
                    <tbody>{playersList}</tbody>
                </table>)
        } catch(e) {return <p>L'Arène est vide où vous avez déjà affronté tout les joueurs aujourd'hui</p>}
    }

    // Affiche la liste des défis
    defisList() {
        try {
            const { defis } = this.state
            const defisList = []

            defis.forEach((player, key) => {
                defisList.push(
                    <tr key={key} className="font_poppins">
                        <th><b>{player.pseudo}</b> [{player.nom}]</th>
                        <th><b>{player.level}</b></th>
                        <th>GO</th>
                    </tr>)
            })

            return (
                <table className="arene_table">
                    <thead>
                        <tr>
                            <th>Joueur</th>
                            <th>Niveau</th>
                            <th>Combattre</th>
                        </tr>
                    </thead>
                    <tbody>{defisList}</tbody>
                </table>)
        } catch(e) {return <p>L'Arène est vide où vous avez déjà affronté tout les joueurs aujourd'hui</p>}
    }


    render() {
        return (this.checkPlayerArene() ? 
        <div className="f flexdirection_c align_c width_100">
                <h1>Arène</h1>
                <h5 className="arene_title">Liste des joueurs:</h5>
                {this.listPlayer()}
                <h5 className="arene_title">Défis reçus:</h5>
                {this.defisList()}
            </div> : <h2>Tu n'est pas dans l'arène !</h2>
        )
    }
}

export default Arene;