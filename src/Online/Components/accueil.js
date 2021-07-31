import React, {Component} from 'react';
import '../Styles/accueil.css'

//Function
import { setError } from '../../Function/global'
import { loadNews } from '../../Function/news'

class Accueil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        }
    }

    componentDidMount() {
        //Essaye si l'utilisateur a les droits
        try {
            loadNews()
                .then((res) => {
                    if (res.length === 0) return
                    this.setState({news: res})
                })
                .catch((e) => setError(e))
        } catch (e) {setError(e)}
        
    }

    actuality = () => {
        if (this.state.news.length === 0) return <span>Pas d'actualité.</span>
        return ( 
            <div  className="f flexdirection_c align_c actuality_Menu">
                {this.state.news.map((value, key) => {
                    return (
                        <div key={key} className="f flexdirection_c align_c actuality">
                            <div className="f justify_spaceb actuality_Title">
                                <span className="f">{value.titre}</span>
                                <span className="f">▪️ Écrit le {value.date} par {value.user}</span>
                            </div>
                            <div className="actuality_Content">
                                <div className="f flexdirection_c actuality_Content_div" dangerouslySetInnerHTML={{ __html: value.content }} />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div className="f flexdirection_c align_c width_100">
                <h1>Actualités</h1>
                <this.actuality />
            </div>
        )
    }

}

export default Accueil;