import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const couleur = useSelector((state) => state.color);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid" style={{ backgroundColor: couleur }}>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/layout/home" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/layout/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Voir Mon Profil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/layout/couleur" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Modifier Couleur
              </NavLink>
            </li>
            {!user?.admin && (
              <li className="nav-item">
                <NavLink to="/layout/request" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                  Ajouter une demande
                </NavLink>
              </li>
            )}
            {user?.admin && (
              <li className="nav-item">
                <NavLink to="/layout/request" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                  Voir les demandes
                </NavLink>
              </li>
            )}
            {user?.admin && (
              <>
                <li className="nav-item">
                  <NavLink to="/layout/list-tUser" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    Liste Utilisateurs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/layout/add-user" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
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
