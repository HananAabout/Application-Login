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
    pays: "", 
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
      !userData.confirmMotDePasse ||
      !userData.pays // Validation du champ pays
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
          pays: "", // Réinitialisation du champ pays
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
    <div className="container mx-auto py-12">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Ajouter un Utilisateur</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="nom">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              className="w-full p-4 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le nom"
              value={userData.nom}
              onChange={(e) =>
                setUserData({ ...userData, nom: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="prenom">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              className="w-full p-4 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le prénom"
              value={userData.prenom}
              onChange={(e) =>
                setUserData({ ...userData, prenom: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="age">
              Âge
            </label>
            <input
              type="number"
              id="age"
              className="w-full p-4 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez l'âge"
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez l'email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="pseudo">
              Pseudo
            </label>
            <input
              type="text"
              id="pseudo"
              className="w-full p-4 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le pseudo"
              value={userData.pseudo}
              onChange={(e) =>
                setUserData({ ...userData, pseudo: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="MotDePasse">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword.MotDePasse ? "text" : "password"}
                id="MotDePasse"
                className="w-full p-4 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le mot de passe"
                value={userData.MotDePasse}
                onChange={(e) =>
                  setUserData({ ...userData, MotDePasse: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-xl"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    MotDePasse: !showPassword.MotDePasse,
                  })
                }
              >
                {showPassword.MotDePasse ? "👁️" : "🔒"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="confirmMotDePasse">
              Confirmation du mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmMotDePasse ? "text" : "password"}
                id="confirmMotDePasse"
                className="w-full p-4 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="absolute right-2 top-2 text-xl"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmMotDePasse: !showPassword.confirmMotDePasse,
                  })
                }
              >
                {showPassword.confirmMotDePasse ? "👁️" : "🔒"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="pays">
              Pays
            </label>
            <select
              id="pays"
              className="w-full p-4 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.pays}
              onChange={(e) =>
                setUserData({ ...userData, pays: e.target.value })
              }
            >
              <option value="">Sélectionner un pays</option>
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Maroc">Maroc</option>
              <option value="Italie">Italie</option>
              <option value="Chine">Chine</option>
              <option value="Canada">Canada</option>
              <option value="Espagne">Espagne</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700" htmlFor="couleur">
              Couleur préférée
            </label>
            <select
              id="pays"
              className="w-full p-4 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.pays}
              onChange={(e) =>
                setUserData({ ...userData, couleur: e.target.value })
              }
            >
              <option value="">Sélectionner un couleur</option>
              <option value="Rouge">Rouge</option>
              <option value="vert">Vert</option>
              <option value="Noir">Noir</option>
              <option value="Blanc">Blanc</option>
              <option value="Rose">Rose</option>
              <option value="Orange">Orange</option>
              <option value="jaune">Jaune</option>
              <option value="Gris">Gris</option>
            </select>
         
          </div>
          <div>
            <label className="flex items-center text-lg font-medium text-gray-700">
              <input
                type="checkbox"
                id="admin"
                className="mr-2"
                checked={userData.admin}
                onChange={(e) =>
                  setUserData({ ...userData, admin: e.target.checked })
                }
              />
              Admin ?
            </label>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleSubmit}
            >
              Ajouter
            </button>
          </div>
        </form>
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
      </div>
      {isSuccessModalOpen && (
        <div
          className="modal show d-block fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <div className="modal-dialog bg-white rounded-lg p-6 shadow-xl max-w-sm">
            <div className="modal-header border-b-2 pb-3">
              <h5 className="modal-title text-lg text-blue-600">
                <i className="bi bi-check-circle me-2"></i> Succès
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsSuccessModalOpen(false)}
              ></button>
            </div>
            <div className="modal-body text-center py-4">
              <p className="text-gray-700">Utilisateur ajouté avec succès !</p>
            </div>
            <div className="modal-footer border-t-2 pt-3">
              <button
                type="button"
                className="w-full bg-blue-600 text-white p-2 rounded-lg"
                onClick={() => setIsSuccessModalOpen(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
