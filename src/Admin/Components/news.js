import React, {Component} from 'react';
import { Link, Navigate } from "react-router-dom";

//Function
import { setError } from '../../Function/global';
import { addNews, loadNews, deleteNews } from '../../Function/news'

import ContentEditable from 'react-contenteditable'
import sanitizeHtml from "sanitize-html"
import '../Styles/news.css'

/*
    Liste des Actus / Suppression des actus
*/
export class AdminGetActu extends Component {
    constructor(props) {
        super(props)
        this.state = {news: []}
    }
    componentDidMount() {
        try {
            loadNews()
                .then((res) => {if (res.length > 0) this.setState({news: res})})
                .catch((e) => {throw new Error(e)})
        } catch(e) {setError(e)}
        
    }
    clickDeleteActuality (id, key) {
        try {
            deleteNews(id)
                .then(() => {
                    const newNews = this.state.news
                    newNews.splice(key, 1);
                    this.setState({news: newNews})
                })
                .catch((e) => {throw new Error(e)})
        } catch(e) {setError(e)}
        
    }
    render() {
        return ( 
            <div className="f width_100 flexdirection_c align_c actuality_Menu">
                <h1>Actualités</h1>
                {this.state.news.length === 0 ? <span className="f justify_c width_100">Pas d'actualité.</span> : this.state.news.map((value, key) => {
                    return (
                        <div key={key} className="f flexdirection_c align_c actuality">
                            <div className="f justify_spaceb actuality_Title">
                                <span className="f">{value.titre}</span>
                                <div className="f">
                                    <span>▪️ Écrit le {value.date} par {value.user}</span>
                                    <button className="button_news_delete" onClick={() => {if (window.confirm('Vous êtes sur de vouloir supprimer cette actualité?')) this.clickDeleteActuality(value.id, key)}}><i className="fal fa-trash-alt"></i></button>
                                </div>
                            </div>
                            <div className="actuality_Content">
                                <div className="f flexdirection_c actuality_Content_div" dangerouslySetInnerHTML={{ __html: value.content }} />
                            </div>
                        </div>)
                })}
                <Link to="/admin/news/add" className="news_add_button">
                    <i className="fas fa-plus"></i>
                    <span className="news_add_text">Ajouter</span>
                </Link>
            </div>
        )
    }
}
/*
    Ajout d'actus
*/
export class AdminAddActu extends Component {
    constructor(props) {
        super(props)
        this.state = {news_title: '',  html: '', date: new Date().toLocaleString(), redirect: false}
        this.changeForm = this.changeForm.bind(this);
    }
    changeForm(event) {
        if (event.target.value.length < 50) this.setState({[event.target.name]: event.target.value})
    }
    handleChange = evt => {
        if (evt.target.value.length < 700) this.setState({ html: evt.target.value });
      };

    sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "span"],
        allowedAttributes: { a: ["href"] }
      };

    sanitize = () => {
        this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
      };

    fnSubmit = (event) => {
        event.preventDefault();
        
        if (event.nativeEvent.submitter.name !== 'send') return
        if (!this.state.news_title || !this.state.html) return this.props.errMsg('Il manque un champ !')
        if (this.state.news_title > 50 || this.state.html > 700) return
            addNews(this.state.news_title, this.state.html)
                .then(() => this.setState({redirect: true}))
                .catch((err) => {this.props.errMsg(err)})
                
    }

    render() {
        return this.state.redirect ? <Navigate to ="/admin/news" /> : <div className="f width_100 flexdirection_c align_c actuality_Menu">
                <h1>Ajouter une actualité</h1>
                <form className="f flexdirection_c align_c news_add_form" onSubmit={this.fnSubmit.bind(this)}>
                    <label className="f flexdirection-c">
                        Titre :
                        <input className="box_shadow" type="text" name='news_title' value={this.state.news_title} onChange={this.changeForm} />
                    </label>
                    <label className="f flexdirection_c news_add_label">
                        Contenu :
                        <ContentEditable className="news_add_textarea flex1 box_shadow" tagName='span' innerRef={this.contentEditable} html={this.state.html} onChange={this.handleChange} />
                    </label>
                    <h2 className="admin_news">Mise en page:</h2>
                    <div>
                        <EditButton cmd="formatBlock" arg="p" name="Paragraphe" />
                        <EditButton cmd="italic" name="Italique" />
                        <EditButton cmd="bold" name="Gras" />
                        <EditButton cmd="underline" name="Souligne" />
                        <EditButton cmd="formatBlock" arg="h1" name="H1" />
                        <EditButton cmd="createLink" arg="https://test.fr" name="Lien" />
                    </div>
                    <h2 className="admin_news">Sources:</h2>
                    <textarea
                        className="admin_news_source"
                        value={this.state.html}
                        onChange={this.handleChange}
                        onBlur={this.sanitize}
                    />
                    <div>
                        <input className="btn" type="submit" value="Publier" name="send" />
                        <Link className="btn btn_secondary" to="/admin/news">Retour</Link>
                    </div>
                    
                </form>
                {this.state.html ? (
                <div className="f flexdirection_c align_c actuality mt-15">
                    <div className="f justify_spaceb actuality_Title">
                        <span className="f">{this.state.news_title}</span>
                        <span className="f">▪️ Écrit le {this.state.date}</span>
                    </div>
                    <div className="actuality_Content">
                        <div className="f flexdirection_c actuality_Content_div" dangerouslySetInnerHTML={{ __html: this.state.html }} />
                    </div>
                </div>) : null}
            </div>
    }
}

function EditButton(props) {
    return (
      <button
        className="btn btn_small btn_outline_info"
        key={props.cmd}
        onMouseDown={evt => {
          evt.preventDefault(); // Avoids loosing focus from the editable area
          document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
        }}
      >
        {props.name || props.cmd}
      </button>
    );
  }