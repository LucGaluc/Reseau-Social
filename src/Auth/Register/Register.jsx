import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Footer from "../../Footer/Footer";
import NavBar from "../../components/navBar/navBar";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstname: firstName,
                lastname: lastName,
            }),
        };
        console.log("option", options);

        //Appel Api
        await fetch(
            `https://social-network-api.osc-fr1.scalingo.io/serial-viewer/register`,
            options
        )
            .then((response) => response.json()) // Récupère la réponse au format JSON
            .then((data) => {
                if (data.success) {
                    navigate("/LoginForm");
                } else {
                    alert(data.message);
                }
            }); // Utilise les données renvoyées par l'API
    };

    return (
        <div>
            <div className="navContainer">
                {" "}
                <NavBar />
            </div>
            <div className="wrapperRegister">
                <div className="container">
                    <h1 className="pageTitle">Création de Compte</h1>
                    <form action="" method="post">
                        <div className="identifiant">
                            <label htmlFor="">Nom</label>
                            <input
                                type="text"
                                id="Nom"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="identifiant">
                            <label htmlFor="">Prénom</label>
                            <input
                                type="text"
                                id="Prenom"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="identifiant">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="identifiant">
                            <label htmlFor="">Mot de Passe</label>
                            <input
                                type="password"
                                id="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="buttonInscription"
                        >
                            S'inscrire
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
