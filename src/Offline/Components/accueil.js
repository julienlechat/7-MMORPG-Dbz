// STYLE
import '../Styles/accueil.css'
// IMAGE
import LogoDesc from '../../img/Horsligne/dbz.jpg'

////////////////////////////////////
//   Page Accueil Hors Connexion  //
////////////////////////////////////

function Accueil() {

  return (
        <main className='f align_c justify_evenly'>
            <section className="f align_c menuGauche">
                <img src={LogoDesc} className="box-shadow" width="350" height="350" alt="presentation" />
            </section>
            <section className="menuDroite">
                <h1>Présentation du jeu</h1>
                <p className="Description">
                    <b>Db Saiyan</b> est un jeu en ligne gratuit dans lequel le joueur incarne un <b>Guerrier</b>.<br />
                    L'objectif premier est de <b>devenir le meilleur Guerrier</b>. Pour cela divers moyens existent comme améliorer ses caractéristiques, avoir les meilleurs équipements, apprendre les meilleurs techniques ou bien d'autres actions encore. <br/>
                    Mais le joueur peut <b>choisir d'autres objectifs</b> selon ses envies : son objectif peut être d'apprendre le plus de techniques possible, de devenir le plus riche Guerrier ou d'avoir le meilleur clan du jeu !<br/>
                </p>
                <h1>Participez maintenant à l'aventure !</h1>
                <p className="Description">
                    <b>Inscrit-toi maintenant</b> pour rejoindre l'aventure !<br />
                </p>
            </section>
        </main>
  );
}

export default Accueil;
