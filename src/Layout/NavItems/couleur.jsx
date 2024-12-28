import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateColor } from "../../Redux/action";
import "bootstrap/dist/css/bootstrap.min.css";

const Couleur = () => {
  const user = useSelector((state) => state.user); 
  const userColor = useSelector((state) => state.color);
  const [color, setColor] = useState(userColor || "#000000"); 
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    setColor(e.target.value); 
  };

  const handleSaveColor = () => {
    if (!user) {
      alert("No user is connected.");
      return;
    }
    console.log("Attempting to update color:", color);
    axios
      .put(
        `https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${user.id}`,
        {
          ...user,
          couleur: color, 
        }
      )
      .then((res) => {
        console.log("Response from API:", res);
        if (res.status === 200) {
          dispatch(updateColor(color));
         
        } else {
          alert("Erreur lors de la mise à jour de la couleur.");
        }
      })
      .catch((err) => {
        console.error("Error from API:", err);
        alert("Échec de la mise à jour de la couleur. Veuillez réessayer.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title mb-0">Modifier Ma Couleur Préférée</h2>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h5 className="mb-3">Choisir une nouvelle couleur :</h5>
            <div className="d-flex align-items-center">
              <input
                type="color"
                value={color}
                onChange={handleColorChange} 
                className="form-control form-control-color me-3"
                title="Choisissez votre couleur"
              />
              <div
                className="rounded-circle border shadow-sm"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: color, 
                }}
              ></div>
            </div>
          </div>
          <button
            onClick={handleSaveColor} 
            className="btn btn-success btn-lg mt-3"
          >
            Enregistrer
          </button>
        </div>
        <div className="card-footer text-muted">
          <p>
            <strong>Couleur actuelle de utilisateur :</strong> {userColor}
          </p>
          <p>
            <strong>ID de utilisateur :</strong> {user?.id || "Non disponible"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Couleur;
