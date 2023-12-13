import { Link } from "react-router-dom";
import "./navBar.css";
import Logout from "../../Auth/Logout/Logout";
import { useState } from "react";

function NavBar(props) {

    const [burger, setBurger] = useState(false)


    const toggleBurger = () => {
      setBurger(!burger)
    }
  
    if (burger) {
        document.body.classList.add('active-burger')
    } else {
        document.body.classList.remove('active-burger')
    }
    
    /* {window.innerWidth < 768 ? s : setFf= true} */
    console.log("xx", window.innerWidth);
/*     let db = document.querySelector('.navImage')

    if (window.innerWidth == 768) {
        
    } */

    return (
        <div className="nav">
            <div className="idSite">
                <div className="navImage">
                    <div className="image">
                        <a
                            href="https://youtu.be/KZ6HqUztGJ0?t=43"
                            target="_blank"
                        >
                            <button className="imageUn"></button>
                        </a>
                    </div>
                    <div className="tete"></div>
                </div>
                <div className="toggle" onClick={toggleBurger}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                {burger && (
                    <div className="gg">
                        <nav>
                            <Logout />
                        </nav>

                        <br></br>
                        <br></br>

                        <nav className="home gglien">
                            <Link to={"/"}>Accueil</Link>
                        </nav>

                        <br></br>
                        <br></br>

                        <nav className="login gglien">
                            <Link to={"/LoginForm.jsx"}>Connexion</Link>
                        </nav>

                        <nav className="register gglien">
                            <Link to={"/Register.jsx"}>Creer un Compte</Link>
                        </nav>

                        <nav className="profile gglien">
                            <Link to={"/Profile.jsx"}>Editer Profil</Link>
                        </nav>

                        <br></br>
                        <br></br>

                        <nav className="search gglien">
                            <Link to={"/search"}>Chercher un film</Link>
                        </nav>

                        <nav className="create gglien">
                            <Link to={"/CreatePost.jsx"}>Créer un post</Link>
                        </nav>

                        <nav className="render gglien">
                            <Link to={"/RecupPosts.jsx"}>Afficher Posts</Link>
                        </nav>

                        <nav className="search gglien">
                            <Link to={"/searchPosts.jsx"}>Chercher un Post</Link>
                        </nav>
                    </div>
                )}

            </div>
            <br></br>
            <br></br>
            <nav>
                <Logout />
            </nav>
            <br></br>
            <br></br>
            <nav className="home lien">
                <Link to={"/"}>Accueil</Link>
            </nav>
            <br></br>
            <br></br>
            <nav className="login lien">
                <Link to={"/LoginForm.jsx"}>Connexion</Link>
            </nav>
            <nav className="register lien">
                <Link to={"/Register.jsx"}>Creer un Compte</Link>
            </nav>
            <nav className="profile lien">
                <Link to={"/Profile.jsx"}>Editer Profil</Link>
            </nav>
            <br></br>
            <br></br>
            <nav className="search lien">
                <Link to={"/search"}>Chercher un film</Link>
            </nav>
            <nav className="create lien">
                <Link to={"/CreatePost.jsx"}>Créer un post</Link>
            </nav>
            <nav className="render lien">
                <Link to={"/RecupPosts.jsx"}>Afficher Posts</Link>
            </nav>
            <nav className="search lien">
                <Link to={"/searchPosts.jsx"}>Chercher un Post</Link>
            </nav>

        </div>
    );
}
export default NavBar;
