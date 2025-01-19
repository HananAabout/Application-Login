import { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    age: "",
    email: "",
    pseudo: "",
    MotDePasse: "",
    confirmMotDePasse: "",
    couleur: "#000000", 
    admin: false,
  });

  const [message, setMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({
    MotDePasse: false,
    confirmMotDePasse: false,
  });

  const handleSubmit = () => {
    if (
      !userData.nom ||
      !userData.prenom ||
      !userData.age ||
      !userData.email ||
      !userData.pseudo ||
      !userData.MotDePasse ||
      !userData.confirmMotDePasse
    ) {
      setMessage("Tous les champs sont obligatoires");
      return;
    }

    if (userData.MotDePasse !== userData.confirmMotDePasse) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordValidation.test(userData.MotDePasse)) {
      setMessage(
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et 8 caractères."
      );
      return;
    }

    axios
      .post(
        "https://6761885646efb37323720ccc.mockapi.io/loginStagaires",
        userData
      )
      .then(() => {
        setMessage("");
        setIsSuccessModalOpen(true);
        setUserData({
          nom: "",
          prenom: "",
          age: "",
          email: "",
          pseudo: "",
          MotDePasse: "",
          confirmMotDePasse: "",
          couleur: "#000000",
          admin: false,
        });
      })
      .catch((error) => {
        setMessage(
          error.response
            ? `Erreur ${error.response.status}: ${
                error.response.data?.message || "Une erreur est survenue."
              }`
            : "Le serveur ne répond pas. Veuillez réessayer plus tard."
        );
      });
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">Ajouter un Utilisateur</h2>
        <form className="needs-validation" noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="nom">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              className="form-control"
              placeholder="Entrez le nom"
              value={userData.nom}
              onChange={(e) =>
                setUserData({ ...userData, nom: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="prenom">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              className="form-control"
              placeholder="Entrez le prénom"
              value={userData.prenom}
              onChange={(e) =>
                setUserData({ ...userData, prenom: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="age">
              Âge
            </label>
            <input
              type="number"
              id="age"
              className="form-control"
              placeholder="Entrez l'âge"
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Entrez l'email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="pseudo">
              Pseudo
            </label>
            <input
              type="text"
              id="pseudo"
              className="form-control"
              placeholder="Entrez le pseudo"
              value={userData.pseudo}
              onChange={(e) =>
                setUserData({ ...userData, pseudo: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="MotDePasse">
              Mot de passe
            </label>
            <div className="input-group">
              <input
                type={showPassword.MotDePasse ? "text" : "password"}
                id="MotDePasse"
                className="form-control"
                placeholder="Entrez le mot de passe"
                value={userData.MotDePasse}
                onChange={(e) =>
                  setUserData({ ...userData, MotDePasse: e.target.value })
                }
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    MotDePasse: !showPassword.MotDePasse,
                  })
                }
              >
                {showPassword.MotDePasse ? "🔍" : "💖"}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="confirmMotDePasse">
              Confirmation du mot de passe
            </label>
            <div className="input-group">
              <input
                type={showPassword.confirmMotDePasse ? "text" : "password"}
                id="confirmMotDePasse"
                className="form-control"
                placeholder="Confirmez le mot de passe"
                value={userData.confirmMotDePasse}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    confirmMotDePasse: e.target.value,
                  })
                }
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmMotDePasse: !showPassword.confirmMotDePasse,
                  })
                }
              >
                {showPassword.confirmMotDePasse ? "🔍" : "💖"}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="couleur">
              Couleur préférée
            </label>
            <input
              type="color"
              id="couleur"
              className="form-control form-control-color"
              value={userData.couleur}
              onChange={(e) =>
                setUserData({ ...userData, couleur: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="admin"
                checked={userData.admin}
                onChange={(e) =>
                  setUserData({ ...userData, admin: e.target.checked })
                }
              />
              <label className="form-check-label" htmlFor="admin">
                Admin ?
              </label>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Ajouter
            </button>
          </div>
        </form>
        {message && <p className="text-danger mt-3">{message}</p>}
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
  <div
    className="modal show d-block"
    tabIndex="-1"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div
        className="modal-content"
        style={{
          border: "none",
          borderRadius: "10px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          className="modal-header"
          style={{
            backgroundColor: "#003366", 
            color: "white", // Texte blanc
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <h5 className="modal-title">
            <i className="bi bi-check-circle me-2"></i> Succès
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setIsSuccessModalOpen(false)}
          ></button>
        </div>
        <div
          className="modal-body text-center"
          style={{
            padding: "20px",
            backgroundColor: "#f9f9f9", 
          }}
        >
          <p className="fs-5 mb-0" style={{ color: "#333" }}> 
            Utilisateur ajouté avec succès !
          </p>
        </div>
        <div
          className="modal-footer"
          style={{
            backgroundColor: "#f9f9f9", 
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "#003366", 
              color: "white",
              padding: "8px 20px",
              borderRadius: "5px",
            }}
            onClick={() => setIsSuccessModalOpen(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AddUser;