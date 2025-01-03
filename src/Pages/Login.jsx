import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/action";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ pseudo: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (attempts >= 3) return;
    axios
      .get("https://6761885646efb37323720ccc.mockapi.io/loginStagaires")
      .then((response) => {
        const user = response.data.find(
          (u) =>
            u.pseudo === credentials.pseudo &&
            u.MotDePasse === credentials.password
        );
        if (user) {
          dispatch(loginUser(user));
          navigate("/layout");
        } else {
          setErrors([...errors, "Identifiants invalides"]);
          setAttempts(attempts + 1);
        }
      })
      .catch((errors) => {
        setErrors([...errors, "Erreur lors de la connexion"]);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #6AB7FF, #0088CC)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="card p-5"
        style={{
          width: "400px",
          borderRadius: "15px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="text-center mb-4">
          <h1
            className="h4"
            style={{
              color: "#0088CC",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Bienvenue de nouveau !
          </h1>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            Veuillez entrer vos identifiants pour vous connecter.
          </p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={credentials.pseudo}
            onChange={(e) =>
              setCredentials({ ...credentials, pseudo: e.target.value })
            }
            className="form-control"
            style={{
              height: "50px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "1px solid #DDD",
              padding: "10px",
            }}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Mot de passe"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="form-control"
            style={{
              height: "50px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "1px solid #DDD",
              padding: "10px",
            }}
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={attempts >= 3}
          className={`btn w-100 ${
            attempts >= 3 ? "btn-secondary" : "btn-primary"
          }`}
          style={{
            height: "50px",
            fontSize: "1rem",
            borderRadius: "10px",
            background: attempts >= 3 ? "#CCC" : "#0088CC",
            border: "none",
          }}
        >
          SE CONNECTER
        </button>
        {errors.length > 0 && (
          <ul className="mt-3 text-danger">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <div className="text-center mt-4">
          <p style={{ color: "#999", fontSize: "0.85rem" }}>
            Pas encore inscrit ?{" "}
            <a
              href="#"
              onClick={() => navigate("/create-account")}
              style={{
                color: "#0088CC",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Créez un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
