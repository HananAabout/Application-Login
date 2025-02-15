import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateColor } from "../../Redux/action";

const Couleur = () => {
  const user = useSelector((state) => state.user);
  const userColor = useSelector((state) => state.color);
  const [color, setColor] = useState(userColor || "#ffffff");
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSaveColor = () => {
    if (!user) {
      alert("Aucun utilisateur connecté.");
      return;
    }

    if (user.age < 15 && user.role !== "admin") {
      alert("Vous n'avez pas le droit de changer la couleur.");
      return;
    }

    axios
      .put(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${user.id}`, {
        ...user,
        couleur: color,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateColor(color));
        } else {
          alert("Erreur lors de la mise à jour de la couleur.");
        }
      })
      .catch(() => {
        alert("Échec de la mise à jour de la couleur. Veuillez réessayer.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Modifier Ma Couleur Préférée
        </h2>

        <div className="flex flex-col items-center">
          <label className="text-lg font-medium text-gray-600 mb-3">
            Choisissez une nouvelle couleur :
          </label>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-16 h-16 cursor-pointer border rounded-lg shadow-md"
            disabled={user.age < 15 && user.role !== "admin"}
          />
          <div
            className="mt-4 w-20 h-20 rounded-full border-4 shadow-inner"
            style={{ backgroundColor: color }}
          ></div>
        </div>

        <button
          onClick={handleSaveColor}
          className={`mt-6 w-full text-white py-2 rounded-lg shadow-md transition ${
            user.age < 15 && user.role !== "admin"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={user.age < 15 && user.role !== "admin"}
        >
          Enregistrer
        </button>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
          <p className="text-gray-700">
            <strong>Couleur actuelle :</strong> <span style={{ color: userColor }}>{userColor}</span>
          </p>
          <p className="text-gray-700">
            <strong>ID de utilisateur :</strong> {user?.id || "Non disponible"}
          </p>
          
          <p className="text-gray-700">
            <strong>Âge :</strong> {user?.age || "Non défini"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Couleur;
