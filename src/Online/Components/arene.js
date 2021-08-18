import React, { Component } from 'react'
import '../Styles/arene.css'

import { setError } from '../../Function/global'
import { Fn_GetPlayerList, Fn_getDefis, Fn_sendDefi, Fn_getDefisSent } from '../../Function/arene'

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
            this.loadDefisSent()
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
    sendDefi(player) {
        try {
            Fn_sendDefi(player)
                .then((res) => setError(res, 'alert-success'))
                .catch((e) => setError(e))
        } catch(e) {setError(e)}
    }
    // Charge la liste des joueurs
    loadPlayerList() {
        Fn_GetPlayerList()
            .then((res) => this.setState({players: res}))
            .catch((e) => setError(e))
    }
    // Charge la liste des défis
    loadDefisList() {
        Fn_getDefis()
            .then((res) => this.setState({defis: res}))
            .catch((e) => setError(e))
    }
    // Charge la liste des défis envoyées
    loadDefisSent() {
        Fn_getDefisSent()
            .then((res) => this.setState({defisSent: res}))
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
                        <th className="f justify_c"><div href="/" className="arene_link" onClick={() => this.sendDefi(player.id)} >Go</div></th>
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
        } catch(e) {return <p>L'Arène est vide ou vous avez déjà affronté tout les joueurs aujourd'hui.</p>}
    }

    // Affiche la liste des défis reçus
    defisList() {
        try {
            const { defis } = this.state
            const defisList = []

            defis.forEach((player, key) => {
                defisList.push(
                    <tr key={key} className="font_poppins">
                        <th><b>{player.pseudo}</b> [{player.nom}]</th>
                        <th><b>{player.level}</b></th>
                        <th><div href="/" className="arene_link" onClick={() => this.sendDefi(player.id)} >Go</div></th>
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
        } catch(e) {return <p>Vous n'avez reçus aucun défis pour le moment.</p>}
    }

    // Affiche la liste des défis envoyées
    defisSentList() {
        try {
            const { defisSent } = this.state
            const sentList = []

            defisSent.forEach((player, key) => {
                const etat = () => {
                    if (player.etat === 1) {
                        return <th><div href="/" className="arene_link" onClick={() => this.sendDefi(player.id)} >Gagné</div></th>
                    } else if (player.etat === 2) {
                        return <th><div href="/" className="arene_link" onClick={() => this.sendDefi(player.id)} >Perdu</div></th>
                    } else {
                        return <th className="f justify_c">En attente |&nbsp;<div href="/" className="arene_link" onClick={() => this.sendDefi(player.id)} >Annuler ?</div></th>
                    }
                }
                sentList.push(
                    <tr key={key} className="font_poppins">
                        <th><b>{player.pseudo}</b> [{player.nom}]</th>
                        <th><b>{player.level}</b></th>
                        {etat()}
                    </tr>)
            })

            return (
                <table className="arene_table">
                    <thead>
                        <tr>
                            <th>Joueur</th>
                            <th>Niveau</th>
                            <th>Etat</th>
                        </tr>
                    </thead>
                    <tbody>{sentList}</tbody>
                </table>)
        } catch(e) {return <p>Vous n'avez pas encore envoyé de défi aujourd'hui.</p>}
    }


    render() {
        var cptDefis = () => {
            if (this.state.defis) return this.state.defis.length
            return 0
        }

        return (this.checkPlayerArene() ? 
        <div className="f flexdirection_c align_c width_100 arene_body">
                <h1>Arène</h1>
                <h5 className="arene_title">Liste des joueurs:</h5>
                {this.listPlayer()}
                <h5 className="arene_title">{cptDefis() > 1 ? 'Défis reçus' : 'Défi reçu'}:</h5>
                {this.defisList()}
                <h5 className="arene_title">Défis envoyées:</h5>
                {this.defisSentList()}
            </div> : <h2>Tu n'est pas dans l'arène !</h2>
        )
    }
}

export default Arene;