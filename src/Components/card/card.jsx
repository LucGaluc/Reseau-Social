import { useState, useEffect } from 'react'
import './card.css'

function Card(props){
    const apiUrlRecup = "https://social-network-api.osc-fr1.scalingo.io/serial-viewer/posts?page=1";

    const [modal, setModal] = useState(false)
    const [posts, setPosts] = useState([]);


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
    




      console.log('coucou' , posts);



    const toggleModal = () => {
        setModal(!modal)
    }
    
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    
    return(
        <div className="card" onClick={toggleModal}>
            <div className="cardImage">
                <img src={`${props.tableau.Poster}`} alt="" />
            </div>

            <div className="cardText">
                <div>
                    {props.tableau.Title}  
                </div>
                <div>
                    {props.tableau.Year}
                </div>
                <div>
                    {props.tableau.Type}
                </div>

            </div>

            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}>
                        <div className="modal-content">
                            <div className="modalImage">
                                <div className="modal-img">
                                    <img src={`${props.tableau.Poster}`} alt="" />
                                </div>
                                <div className="modal-title">
                                    {"Titre : " + props.tableau.Title} 
                                </div>
                                <div className="modal-title">
                                    {"Année : " + props.tableau.Year}
                                </div>
                                <div className="modal-title">
                                    {"Type : " + props.tableau.Type} 
                                </div>
                            </div>
                            <div className="modalCommentaire">
                                <div className="modal_commentaire_container">
                                    
                                    {posts?.map((element,index) => {
                                        return (<div className="modal_com" key={index}>
                                            {"prenom : " + element.firstname}
                                            <br/>
                                            {"nom : " + element.lastname}
                                            <br/>
                                            {"nombre de like : " + element.likes.length}
                                            <br/>
                                            {"nombre de commentaire : " + element.comments.length}
                                        </div>)
                                    })}
                                </div>
                            </div>
                            <button className='close-modal' onClick={toggleModal} >X</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
export default Card