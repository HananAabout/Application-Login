import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      className="flex justify-center items-center min-h-screen bg-white-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="p-8 w-[35rem] rounded-lg bg-gradient-to-br from-white to-gray-100 shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Créer un Compte</h1>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nom</label>
            <input
              type="text"
              placeholder="Entrez votre nom"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
              className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Prénom</label>
            <input
              type="text"
              placeholder="Entrez votre prénom"
              value={formData.prenom}
              onChange={(e) =>
                setFormData({ ...formData, prenom: e.target.value })
              }
              className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Âge</label>
            <input
              type="number"
              placeholder="Entrez votre âge"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Pseudo</label>
            <input
              type="text"
              placeholder="Entrez un pseudo"
              value={formData.pseudo}
              onChange={(e) =>
                setFormData({ ...formData, pseudo: e.target.value })
              }
              className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Pays</label>
            <select
              value={formData.pays}
              onChange={(e) =>
                setFormData({ ...formData, pays: e.target.value })
              }
              className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
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
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Couleur Préférée</label>
            <select
              value={formData.couleur}
              onChange={(e) =>
                setFormData({ ...formData, couleur: e.target.value })
              }
              className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              <option value="">Sélectionnez une couleur</option>
              <option value="#FF0000">Rouge</option>
              <option value="#0000FF">Bleu</option>
              <option value="#008000">Vert</option>
              <option value="#FFFF00">Jaune</option>
              <option value="#000000">Noir</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Mot de Passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrez un mot de passe"
                value={formData.MotDePasse}
                onChange={(e) =>
                  setFormData({ ...formData, MotDePasse: e.target.value })
                }
                className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Confirmer Mot de Passe</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmMotDePasse}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmMotDePasse: e.target.value,
                  })
                }
                className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-4 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="adminCheck"
              checked={formData.admin}
              onChange={(e) =>
                setFormData({ ...formData, admin: e.target.checked })
              }
              className="mr-2 focus:ring-4 focus:ring-indigo-300"
            />
            <label htmlFor="adminCheck" className="text-gray-700">
              Admin
            </label>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-4 text-white text-base font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            Créer un Compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompte;
