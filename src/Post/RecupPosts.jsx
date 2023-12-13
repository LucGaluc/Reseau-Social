import React, { useState, useEffect } from "react";
import "./RecupPosts.css";
import NavBar from "../components/navBar/navBar";

function RecupPosts() {
  const apiUrlLike =
    "https://social-network-api.osc-fr1.scalingo.io/serial-viewer/post/like";
  const apiUrlCom =
    "https://social-network-api.osc-fr1.scalingo.io/serial-viewer/post/comment";
  const apiUrlRecup =
    "https://social-network-api.osc-fr1.scalingo.io/serial-viewer/posts?page=1";
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [posts, setPosts] = useState([]);
  const [com, setCom] = useState("");
  // Use local state for comments
  const [commentStates, setCommentStates] = useState({});
  const [like, setLike] = useState({});

  async function commenter(postId) {
    try {
      const response = await fetch(apiUrlCom, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify({
          postId: postId,
          content: com,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.status}`);
      }

      const dataCom = await response.json();
      console.log(dataCom);
      setCommentStates({ ...commentStates, [postId]: "" });
      recupPosts();
    } catch (error) {
      console.error("Erreur : " + error);
    }
  }

  async function recupPosts() {
    try {
      const response = await fetch(apiUrlRecup, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.status}`);
      }

      const dataget = await response.json();
      console.log(dataget.posts);
      setPosts(dataget.posts);
    } catch (error) {
      console.error("Erreur : " + error);
    }
  }

  useEffect(() => {
    recupPosts();
  }, []);

  function li(postId, post) {
    post.likes.forEach((element) => {
      if (element.userId == post.userId) {
        alert("tu as déja liké connard");
      }
    });
    liker(postId, post);
  }

  async function liker(postId, post) {
    try {
      const response = await fetch(apiUrlLike, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify({
          postId: postId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur de réseau - ${response.status}`);
      }

      const data = await response.json();
      console.log("data", data);
      setLike({ ...like, [postId]: "" });
      recupPosts();
    } catch (error) {
      alert("connecte toi pour like");
      console.error("Erreur : " + error);
    }
  }

  /* console.log(posts); */

  return (
    <div className="galacticContainer">
      <div className="navContainer">
        <NavBar />
      </div>
      <div className="contentContainer">
        <h2 class="postsExistants">Posts Existants</h2>
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <div className="publi">
                <h2 className="tittlePubli">{post.title}</h2>
                <p className="postPubli">{post.content}</p>
              </div>

              <div className="commentsSection">
                <div>
                  <div className="sectionLike">
                    {" "}
                    <button
                      className="btnLike"
                      onClick={() => li(post._id, post)}
                      type="submit"
                    >
                      💖
                    </button>{" "}
                    {post.likes.length} 👍
                  </div>
                  <div className="sectionCom">
                    <input
                      onChange={(e) => setCom(e.target.value)}
                      name="inputCom"
                      type="text"
                      placeholder="Commenter"
                      defaultValue=""
                    />
                    <button
                      className="btnCom"
                      onClick={() => commenter(post._id)}
                      type="button"
                    >
                      Commenter
                    </button>{" "}
                  </div>

                  {post.comments.length > 0 && (
                    <h2 className="motCom">Commentaires :</h2>
                  )}
                  {post.comments?.map((com) => (
                    <ul>
                      <li key={com.id}>
                        {" "}
                        <p className="tittleCom">
                          {com.lastname}
                          <span> {com.firstname}:</span> {com.content}
                        </p>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecupPosts;
