import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useDynamicColor from "../Components/useDynamicColor";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const { backgroundColor } = useDynamicColor();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <nav className={`bg-gray-100 text-gray-700`} style={{ backgroundColor: backgroundColor }}>
      <div className="container mx-auto p-4 flex justify-between items-center">
        <button
          className="text-gray-700 focus:outline-none md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
        <div
          className={`mt-4 md:flex md:space-x-4 ${isMenuOpen ? "block" : "hidden"}`}
        >
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <NavLink
                to="/layout/home"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded hover:bg-blue-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
                }
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/layout/profile"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded hover:bg-blue-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
                }
              >
                Voir Mon Profil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/layout/couleur"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded hover:bg-blue-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
                }
              >
                Modifier Couleur
              </NavLink>
            </li>
            {!user?.admin && (
              <li>
                <NavLink
                  to="/layout/request"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded hover:bg-blue-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
                  }
                >
                  Ajouter une demande
                </NavLink>
              </li>
            )}
            {user?.admin && (
              <li>
                <NavLink
                  to="/layout/request"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded hover:bg-blue-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
                  }
                >
                  Voir les demandes
                </NavLink>
              </li>
            )}
            {user?.admin && (
              <>
                <li>
                  <NavLink
                    to="/layout/list-tUser"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded hover:bg-blue-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
                    }
                  >
                    Liste Utilisateurs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/layout/add-user"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded hover:bg-blue-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`
                    }
                  >
                    Ajouter Utilisateur
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
