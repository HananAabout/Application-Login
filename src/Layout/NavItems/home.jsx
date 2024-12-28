import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="home container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h1 className="mb-0">Bienvenue</h1>
            </div>
            <div className="card-body">
              <h2 className="card-title">
                {user.prenom} {user.nom}
              </h2>
              <p className="card-text">
                Nous sommes heureux de vous revoir. Profitez de votre journée !
              </p>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
