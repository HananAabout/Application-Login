import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/action";
import { useNavigate } from "react-router-dom";
import logo from "./logo12.avif";

const HeaderSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const couleur = useSelector((state) => state.color);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header
      className="d-flex justify-content-between align-items-center p-3 text-white"
      style={{ backgroundColor: couleur }}
    >
      <div>
        <img
          src={logo}
          alt="Logo"
          className="img-fluid"
          style={{ height: "50px" ,width:"50px" }}
        />
      </div>
      <div className="d-flex align-items-center">
        {user ? (
          <>
            <img
              src={user.photo || "/path-to-default-avatar.png"} // Affiche une image par défaut si aucune photo
              alt="Photo utilisateur"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <p className="mb-0 me-3">
              Bonjour, {user.prenom} {user.nom}
            </p>
            <button onClick={handleLogout} className="btn btn-danger">
              Se Déconnecter
            </button>
          </>
        ) : (
          <p className="mb-0">Veuillez vous connecter.</p>
        )}
      </div>
    </header>
  );
};

export default HeaderSection;
