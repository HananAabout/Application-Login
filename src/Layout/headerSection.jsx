import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/action";
import { useNavigate } from "react-router-dom";
import logo from "./logo12.avif";
import useDynamicColor from "../Components/useDynamicColor";

const HeaderSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { backgroundColor } = useDynamicColor();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header
      className="flex items-center justify-between p-4 shadow-lg"
      style={{ backgroundColor }}
    >
      <div>
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-12 object-contain rounded-full"
        />
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <img
              src={user.photo || "/path-to-default-avatar.png"}
              alt="Utilisateur"
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
            <p className="text-white font-semibold">
              Bonjour, {user.prenom} {user.nom}
            </p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-300"
            >
              Se Déconnecter
            </button>
          </>
        ) : (
          <p className="text-white font-medium">Veuillez vous connecter.</p>
        )}
      </div>
    </header>
  );
};

export default HeaderSection;
