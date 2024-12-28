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

  const handleLogin = async () => {
    if (attempts >= 3) return;

    try {
      const response = await axios.get(
        "https://6761885646efb37323720ccc.mockapi.io/loginStagaires"
      );
      const user = response.data.find(
        (u) =>
          u.pseudo === credentials.pseudo &&
          u.MotDePasse === credentials.password
      );
      if (user) {
        dispatch(loginUser(user));
        // alert("Login successful!");
        navigate("/layout"); // Redirection vers la page d'accueil
      } else {
        setErrors([...errors, "Invalid credentials"]);
        setAttempts(attempts + 1);
      }
    } catch (errors) {
      setErrors([...errors, "Erreur au cours de la connexion"]);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#8BC34A" }}
    >
      <div
        className="card p-4"
        style={{
          width: "400px",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="h4 mb-3" style={{ color: "#4CAF50" }}>
            Login
          </h1>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={credentials.pseudo}
            onChange={(e) =>
              setCredentials({ ...credentials, pseudo: e.target.value })
            }
            className="form-control"
            style={{ height: "50px", fontSize: "1rem", borderRadius: "8px" }}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="form-control"
            style={{ height: "50px", fontSize: "1rem", borderRadius: "8px" }}
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={attempts >= 3}
          className={`btn btn-block ${
            attempts >= 3 ? "btn-secondary" : "btn-success"
          }`}
          style={{ height: "50px", fontSize: "1rem", borderRadius: "8px" }}
        >
          LOGIN
        </button>
        {errors.length > 0 && (
          <ul className="mt-3 text-danger">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <div className="text-center mt-4">
          <p style={{ color: "#9E9E9E", fontSize: "0.9rem" }}>
            Not registered?{" "}
            <a
              href="#"
              onClick={() => navigate("/create-account")}
              style={{ color: "#4CAF50", textDecoration: "none" }}
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
