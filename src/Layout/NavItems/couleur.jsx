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
  const colorPalette = [
    "#FF5733", "#FF337A", "#A333FF", "#7233FF", "#3369FF",
    "#33B5FF", "#33FFDD", "#33FF91", "#8BFF33", "#DAFF33",
    "#FFEE33", "#FFC733", "#FF8F33", "#FF5E33", "#9C6C5E", "#6E8B9C"
  ];
  const handleColorChange = (newColor) => {
    setColor(newColor);
  };
  const handleSaveColor = () => {
    if (!user) {
      alert("No user is connected.");
      return;
    }
    axios
      .put(
        `https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${user.id}`,
        {
          ...user,
          couleur: color,
        }
      )
      .then((res) => {
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
          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ gap: "15px" }}
          >
            {colorPalette.map((col, index) => (
              <div
                key={index}
                onClick={() => handleColorChange(col)}
                className="rounded-circle border shadow-sm"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: col,
                  cursor: "pointer",
                  border: col === color ? "3px solid black" : "1px solid #ccc",
                }}
              ></div>
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={handleSaveColor} className="btn btn-success btn-lg mt-3">
              Enregistrer
            </button>
          </div>
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
