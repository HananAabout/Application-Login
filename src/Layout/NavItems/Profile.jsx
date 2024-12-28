import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const userColor = useSelector((state) => state.color);
  
  return (
    <div className="container py-5" style={{ backgroundColor: userColor }}>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow-lg">
            <div className="card-header text-center text-white" style={{ backgroundColor: "#007bff" }}>
              <h3>Mon Profil</h3>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Nom:</strong> {user.nom}
                </li>
                <li className="list-group-item">
                  <strong>Prénom:</strong> {user.prenom}
                </li>
                <li className="list-group-item">
                  <strong>Âge:</strong> {user.age}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Pays:</strong> {user.Pays}
                </li>
                <li className="list-group-item">
                  <strong>Couleur:</strong> {user.couleur}
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
