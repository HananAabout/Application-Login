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
      className="navbar navbar-expand-lg bg-light flex-column"
      style={{ height: "100vh" }}
    >
      <div className="container" style={{ backgroundColor: backgroundColor }}>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarAside"
          aria-controls="navbarAside"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarAside"
        >
          <ul className="navbar-nav flex-column gap-4">
            <li className="nav-item">
              <NavLink
                to="/layout/home"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/layout/profile"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Voir Mon Profil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/layout/couleur"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Modifier Couleur
              </NavLink>
            </li>
            {!user?.admin && (
              <li className="nav-item">
                <NavLink
                  to="/layout/request"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Ajouter une demande
                </NavLink>
              </li>
            )}

            {/* Condition : Afficher Voir les demandes si l'utilisateur est admin */}
            {user?.admin && (
              <li className="nav-item">
                <NavLink
                  to="/layout/request"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Voir les demandes
                </NavLink>
              </li>
            )}
            {user?.admin && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/layout/list-tUser"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    Liste Utilisateurs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/layout/add-user"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
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
