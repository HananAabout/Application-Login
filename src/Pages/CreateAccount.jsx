import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateCompte = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    pseudo: "",
    MotDePasse: "",
    confirmMotDePasse: "",
    pays: "",
    couleur: "",
    admin: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (formData.MotDePasse !== formData.confirmMotDePasse) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordValidation.test(formData.MotDePasse)) {
      alert(
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et être composé de 8 caractères minimum."
      );
      return;
    }

    axios
      .post(
        "https://6761885646efb37323720ccc.mockapi.io/loginStagaires",
        formData
      )
      .then(() => {
        alert("Compte créé avec succès !");
        navigate("/");
      })
      .catch((error) => {
        console.error("Erreur lors de la création du compte :", error);
        alert(`Erreur lors de la création du compte : ${error.message}`);
      });
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="card shadow-lg" style={{ width: "35rem", borderRadius: "10px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4" style={{ color: "#1976d2" }}>
            Créer un Compte
          </h3>
          <form>
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre nom"
                value={formData.nom}
                onChange={(e) =>
                  setFormData({ ...formData, nom: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Prénom</label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre prénom"
                value={formData.prenom}
                onChange={(e) =>
                  setFormData({ ...formData, prenom: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Âge</label>
              <input
                type="number"
                className="form-control"
                placeholder="Entrez votre âge"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pseudo</label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrez un pseudo"
                value={formData.pseudo}
                onChange={(e) =>
                  setFormData({ ...formData, pseudo: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pays</label>
              <select
                className="form-select"
                value={formData.pays}
                onChange={(e) =>
                  setFormData({ ...formData, pays: e.target.value })
                }
              >
                <option value="">Sélectionnez un pays</option>
                <option value="France">France</option>
                <option value="Canada">Canada</option>
                <option value="États-Unis">États-Unis</option>
                <option value="Maroc">Maroc</option>
                <option value="Tunisie">Tunisie</option>
                <option value="Algérie">Algérie</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Couleur Préférée</label>
              <select
                className="form-select"
                value={formData.couleur}
                onChange={(e) =>
                  setFormData({ ...formData, couleur: e.target.value })
                }
              >
                <option value="">Sélectionnez une couleur</option>
                <option value="#FF0000">Rouge</option>
                <option value="#0000FF">Bleu</option>
                <option value="#008000">Vert</option>
                <option value="#FFFF00">Jaune</option>
                <option value="#000000">Noir</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Mot de Passe</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Entrez un mot de passe"
                  value={formData.MotDePasse}
                  onChange={(e) =>
                    setFormData({ ...formData, MotDePasse: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Confirmer Mot de Passe</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmMotDePasse}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmMotDePasse: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="adminCheck"
                checked={formData.admin}
                onChange={(e) =>
                  setFormData({ ...formData, admin: e.target.checked })
                }
              />
              <label className="form-check-label" htmlFor="adminCheck">
                Admin
              </label>
            </div>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleSubmit}
            >
              Créer un Compte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompte;
