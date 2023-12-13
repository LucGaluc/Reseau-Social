import React, { useState } from "react";

import "./CreatePost.css";
import RecupPosts from "./RecupPosts";
import NavBar from "../components/navBar/navBar";

function CreatePost() {
  const apiUrl =
    "https://social-network-api.osc-fr1.scalingo.io/serial-viewer/post";
  const [post, setPost] = useState({ title: "", content: "" });
  const [token, setToken] = useState(localStorage.getItem("token"));
  async function createPost() {
    if (!token) {
      console.error("token pas recup");
      return;
    }
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.status}`);
      }

      const data = await response.json();
      console.log("Nouveau post créé :", data);
      setPost({ title: "", content: "" });
      alert("le post a été crée");
    } catch (error) {
      console.error("Erreur : " + error);
    }
  }

  return (
    <div className="createPost">
      <div className="navContainer">
        <NavBar />
      </div>
      <div className="cardCreatePostContainer">
        <div className="cardCreatePost">
          <div className="titre">
            <h2>Créer un post</h2>
          </div>
          <div className="formulaireContainer">
            <div className="form">
              <form>
                <div className="titrePost">
                  <input
                    placeholder="Titre de votre post"
                    type="text"
                    value={post.title}
                    onChange={(e) =>
                      setPost({ ...post, title: e.target.value })
                    }
                  />
                </div>

                <div className="TextAreaPost">
                  <textarea
                    placeholder="Contenu du post"
                    value={post.content}
                    onChange={(e) =>
                      setPost({ ...post, content: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="ButonForm">
                  <button
                    type="button"
                    className="btnCreer"
                    onClick={createPost}
                  >
                    Créer le Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
