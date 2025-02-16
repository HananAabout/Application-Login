import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useDynamicColor from "../Components/useDynamicColor";

const NavbarIndex = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const { backgroundColor } = useDynamicColor();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <aside
      className="bg-gray-100 flex flex-col h-screen"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="p-4">
        <button
          className="text-gray-700 focus:outline-none md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
        <div
          className={`mt-4 md:block ${isMenuOpen ? "block" : "hidden"}`}
        >
          <ul className="flex flex-col space-y-4">
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
    </aside>
  );
};
export default NavbarIndex;
