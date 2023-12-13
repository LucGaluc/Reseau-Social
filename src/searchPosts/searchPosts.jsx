import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar/navBar";
import "./searchPosts.css";

function SearchPosts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 10; // Nombre de posts par page

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://social-network-api.osc-fr1.scalingo.io/serial-viewer/posts?page=${currentPage}&limit=${PAGE_SIZE}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 401) {
                throw new Error("Non autorisé");
            }
            if (response.status !== 200) {
                throw new Error("Erreur HTTP " + response.status);
            }
            const data = await response.json();
            setAllPosts(data.posts);
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    useEffect(() => {
        filterPosts();
    }, [searchTerm, allPosts]);

    const filterPosts = () => {
        if (Array.isArray(allPosts)) {
            const filtered = allPosts.filter((post) => {
                return (
                    post.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    post.content
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            });
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts([]);
        }
    };

    const [selectedPost, setSelectedPost] = useState(null);
    const openPost = (post) => {
        setSelectedPost(post);
    };

    return (
        <div>
            <div className="navContainer">
                <NavBar />
            </div>
            <div className="recherche">
                <div className="searchBarContainer">
                    <input
                        type="text"
                        placeholder="Rechercher par titre ou contenu"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : (
                    <div>
                        <h3>Résultats de la recherche :</h3>
                        <ul className="cardContainer">
                            {filteredPosts.map((result) => (
                                <li
                                    className="lisearch"
                                    key={result.id}
                                    onClick={() => openPost(result)} // Appel de la fonction openPost avec le post actuel
                                >
                                    {result.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedPost && (
                    <div className="postDetail">
                        <h3>Titre:{selectedPost.title}</h3>
                        <p>Contenu:{selectedPost.content}</p>
                        <button
                            className="pagination"
                            onClick={() => setSelectedPost(null)}
                        >
                            Fermer
                        </button>
                    </div>
                )}
            </div>

            <div className="changementPage">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="changementP"
                    disabled={currentPage === 1}
                >
                    Page précédente
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="changementP"
                    disabled={filteredPosts.length < PAGE_SIZE}
                >
                    Page suivante
                </button>
            </div>
        </div>
    );
}

export default SearchPosts;
