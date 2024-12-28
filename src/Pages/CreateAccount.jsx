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

  const handleSubmit = async () => {
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

    try {
      await axios.post(
        "https://6761885646efb37323720ccc.mockapi.io/loginStagaires",
        formData
      );
      alert("Compte créé avec succès !");
      navigate("/"); // Redirection vers la page de login
    } catch (error) {
      console.error("Erreur lors de la création du compte :", error);
      alert(`Erreur lors de la création du compte : ${error.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{
          width: "400px",
          borderRadius: "10px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h3 className="text-center mb-4">Créer un Compte</h3>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={(e) =>
                setFormData({ ...formData, prenom: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Âge"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pseudo"
              value={formData.pseudo}
              onChange={(e) =>
                setFormData({ ...formData, pseudo: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={formData.pays}
              onChange={(e) =>
                setFormData({ ...formData, pays: e.target.value })
              }
            >
              <option value="">Pays</option>
              <option value="France">France</option>
              <option value="Canada">Canada</option>
              <option value="États-Unis">États-Unis</option>
              <option value="Maroc">Maroc</option>
              <option value="Tunisie">Tunisie</option>
              <option value="Algérie">Algérie</option>
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={formData.couleur}
              onChange={(e) =>
                setFormData({ ...formData, couleur: e.target.value })
              }
            >
              <option value="">Couleur préférée</option>
              <option value="Rouge">Rouge</option>
              <option value="Bleu">Bleu</option>
              <option value="Vert">Vert</option>
              <option value="Jaune">Jaune</option>
              <option value="Noir">Noir</option>
            </select>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Mot de passe"
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
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirmer le mot de passe"
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
  );
};

export default CreateCompte;
