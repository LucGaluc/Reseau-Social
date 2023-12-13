import React, { useState } from "react";
import "./Login.css";
import Footer from "../../Footer/Footer";
import NavBar from "../../components/navBar/navBar";
import { useNavigate } from "react-router-dom"; // hook pour rediriger vers une page

function LoginForm() {
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [password, setPassword] = useState(
        localStorage.getItem("password") || ""
    );
    const navigate = useNavigate();

    // Fonction pour gérer la soumission du formulaire
    async function handleSubmit() {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };

        setEmail(""); // Effacer les champs email et mot de passe
        setPassword("");

        const response = await fetch(
            `https://social-network-api.osc-fr1.scalingo.io/serial-viewer/login`,
            options
        );

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("token", data.token);
            navigate("/"); // Rediriger vers la page d'accueil si la connexion réussit
        } else {
            alert("Identifiant ou mot de passe incorrect, veuillez réessayer");
        }
    }

    function goToRegister() {
        navigate("/Register.jsx"); // Fonction pour rediriger vers la page d'inscription
    }
    function goToOublier() {
        const isOublier = window.confirm("Bah pas maintenant !");
        if (isOublier) {
            window.confirm("j'ai dit pas maintenant");
            window.open(
                "https://www.youtube.com/watch?v=8AF-Sm8d8yk",
                "_blank"
            );
        }
    }
    return (
        <div>
            <div className="navContainer">
                {" "}
                <NavBar />
            </div>
            <div className="connexion">
                <div className="middle">
                    <div className="container">
                        <h1 className="pageTitle">Connexion</h1>
                        <div className="identifiant">
                            <label htmlFor="email">Identifiant</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="identifiant">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="buttonValider">
                            <button onClick={handleSubmit}>Valider</button>
                        </div>
                        <div className="buttonRegister">
                            <button onClick={goToRegister}>
                                Créer un Compte
                            </button>
                        </div>
                        <div className="buttonOublier">
                            <button onClick={goToOublier}>
                                Mot de passe oublié ?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginForm;
