import Card from "../card/card";

import "./searchPage.css";
import ApiFilm from "../api/apiFilm";
import { useState } from "react";
import NavBar from "../../../src/components/navBar/navBar";

const apiKey = "cff2dc83"; // Assurez-vous que ceci est votre clé API OMDB correcte
const apiUrl = "http://www.omdbapi.com/";
const socialApiUrl =
  "https://social-network-api.osc-fr1.scalingo.io/serial-viewer/";

function SearchPage(props) {
  /* console.log('search', props.tableau.original_title); */

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchMovies = () => {
    fetch(`${apiUrl}?apikey=${apiKey}&s=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setSearchResults(data.Search);

          // Envoyer les résultats de recherche à notre API
          sendResultsToSocialApi(data.Search);
        } else {
          setSearchResults([]);
        }
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      });
    setSearchTerm("");
  };

  const sendResultsToSocialApi = (results) => {
    fetch(socialApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ results }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Traiter la réponse de votre API ici si nécessaire
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'envoi des résultats à votre API :",
          error
        );
      });
  };



  return (
    <div className="alpha">
      <div className="containerTruc">
        <div className="navContainer">
          <NavBar />
        </div>

        <div className="autreTruc">
          <div className="redimentionTruc">
            <div className="searchBarTruc">
              <div className="searchBarContainerTruc">
                <input
                  type="text"
                  placeholder="Entrez un nom de film"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="inputSearchTruc"
                  onKeyDown={(event) => {
                    if (event.key == "Enter") {
                      searchMovies(searchTerm);
                    }
                  }}
                />
                <button onClick={searchMovies} className="buttonSearch">
                  Rechercher
                </button>
              </div>
            </div>

            <div className="cardContainer">
              {searchResults
                ? searchResults.map((valeur, index) => (
                    <Card tableau={valeur} index={index} key={index} />
                  ))
                : console.log("salut")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchPage;
