import React, { useEffect, useState } from "react";
import "./Profile.css";
import NavBar from "../navBar/navBar";

function Profile() {
  // do  an object
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [edit, setEdit] = useState(false);

  async function getDataProfile() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const response = await fetch(
        `https://social-network-api.osc-fr1.scalingo.io/serial-viewer/user`,
        options
      );
      if (response.ok) {
        const data = await response.json();
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setAge(data.age);
        setOccupation(data.occupation);
        console.log(data);
      } else {
        console.error("Failed to get user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getDataProfile();
  }, []);

  async function updateDataProfile() {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        age: age,
        occupation: occupation,
      }),
    };

    try {
      const response = await fetch(
        `https://social-network-api.osc-fr1.scalingo.io/serial-viewer/user`,
        options
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Impossible d'update les données utilisateur");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleClickEdit() {
    if (edit) {
      updateDataProfile();
    }
    setEdit(!edit);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAge(user.age);
      setOccupation(user.occupation);
    } else {
      getDataProfile();
    }
  }, []);

  return (
    <>
      <div className="navBarContainer">
        <NavBar />
      </div>
      <div className="wrapper">
        {edit === false ? (
          <>
            <div className="profileContainer">
              <h2>Mon Profil d'utilisateur</h2>
              {/* Render user information */}
              <div className="profileLine2">
                <label>Nom:</label>
                <div className="renderInfo">{lastName}</div>
              </div>
              <div className="profileLine2">
                <label>Prénom:</label>
                <div className="renderInfo">{firstName}</div>
              </div>
              <div className="profileLine2">
                <label>Âge:</label>
                <div className="renderInfo">{age}</div>
              </div>
              <div className="profileLine2">
                <label>Occupation:</label>
                <div className="renderInfo">{occupation}</div>
              </div>
              <div className="profileLine2">
                <label>Email:</label>
                <div className="renderInfo">{email}</div>
              </div>
              <div className="buttonStyle">
                <button className="editButton" onClick={handleClickEdit}>
                  Modifier
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="editProfileContainer">
              <h2>Modifier Mon Profil d'utilisateur</h2>
              <label>Nom:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="formEdit"
              />
              <label>Prénom:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="formEdit"
              />
              <label>Âge:</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="formEdit"
              />
              <label>Occupation:</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="formEdit"
              />
              <label>Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="formEdit"
              />
              <div className="buttonStyle">
                <button className="editButton" onClick={handleClickEdit}>
                  Valider
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
