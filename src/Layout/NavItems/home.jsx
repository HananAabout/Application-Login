import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSmile, FaStar, FaClock, FaCheckCircle, FaEnvelope } from "react-icons/fa"; // Import des icônes

const Home = () => {
  // Récupération des données utilisateur depuis le store Redux
  const user = useSelector((state) => state.user);

  // Messages d'accueil personnalisés avec icônes
  const messages = [
    { text: "Bienvenue à bord ! Nous sommes ravis de vous revoir.", icon: <FaSmile className="me-2 text-success" /> },
    { text: "Nous espérons que votre journée sera pleine de succès et de bonheur.", icon: <FaStar className="me-2 text-warning" /> },
    { text: "Vous êtes prêt à accomplir de grandes choses aujourd'hui !", icon: <FaCheckCircle className="me-2 text-primary" /> },
    { text: "Chaque jour est une nouvelle opportunité. Profitez-en !", icon: <FaClock className="me-2 text-info" /> },
    { text: "Si vous avez besoin d'aide, n'hésitez pas à nous contacter.", icon: <FaEnvelope className="me-2 text-danger" /> },
  ];

  // Sélection d'un message aléatoire
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="home container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h1 className="mb-0">
                <FaSmile className="me-2" />
                Bienvenue
              </h1>
            </div>
            <div className="card-body">
              <h2 className="card-title">
                {user.prenom} {user.nom}
              </h2>
              <p className="card-text">
                {randomMessage.icon}
                {randomMessage.text}
              </p>
              <p className="card-text">
                Nous sommes heureux de vous revoir. Profitez de votre journée !
              </p>
              <p className="card-text">
                <FaEnvelope className="me-2" />
                Si vous avez besoin d'aide, n'hésitez pas à nous contacter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
