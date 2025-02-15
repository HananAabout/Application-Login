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
          setErrors([...errors, "Invalid credentials"]);
          setAttempts(attempts + 1);
        }
      })
      .catch(() => {
        setErrors([...errors, "Erreur au cours de la connexion"]);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="p-8 w-96 rounded-lg bg-white shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Se connecter</h1>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={credentials.pseudo}
            onChange={(e) =>
              setCredentials({ ...credentials, pseudo: e.target.value })
            }
            className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
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
            className="w-full p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={attempts >= 3}
          className={`w-full p-4 text-white text-base font-semibold rounded-lg transition-all ${
            attempts >= 3
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          }`}
        >
          Conncter
        </button>
        {errors.length > 0 && (
          <ul className="mt-3 text-red-500">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Non inscrit?{" "}
            <a
              href="#"
              onClick={() => navigate("/create-account")}
              className="text-white px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
