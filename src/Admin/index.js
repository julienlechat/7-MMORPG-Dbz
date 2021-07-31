import React, {Component} from 'react';
import {
    Link,
    Outlet
  } from "react-router-dom";

//Style
 import './Styles/index.css'

 class Admin extends Component {
    render() {
        return (
            <div className="f justify_evenly width_100 height_100 admin_main">
                <div>
                    <div className="f flexdirection_c admin_menu">
                        <span className="admin_menu_title">Général</span>
                        <ul className="admin_menu_ul">
                            <li><Link className="admin_menu_link" to="/admin">Accueil</Link></li>
                            <li><Link className="admin_menu_link" to="/admin/news">Actualités</Link></li>
                        </ul>
                        <span className="admin_menu_title">Paramètres</span>
                        <ul className="admin_menu_ul">
                            <li><Link className="admin_menu_link" to="/admin/persos">Personnages</Link></li>
                        </ul>
                    </div>
                </div>
                <Outlet />
            </div>
        )
    }
 }

 export default Admin;