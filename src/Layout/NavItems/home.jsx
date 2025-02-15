import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const Home = () => {
  const user = useSelector((state) => state.user);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setWelcomeMessage("☀️ Bonjour ! Que cette matinée soit remplie d'énergie et de succès !");
    } else if (currentHour >= 12 && currentHour < 18) {
      setWelcomeMessage("🌤️ Bon après-midi ! Continuez à faire de votre mieux !");
    } else if (currentHour >= 18 && currentHour < 21) {
      setWelcomeMessage("🌙 Bonsoir ! Prenez le temps de vous détendre et de vous reposer.");
    } else {
      setWelcomeMessage("🌌 Bonne nuit ! Profitez d'une nuit paisible et reposante.");
    }
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-[#2575fc] p-6">
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/30 p-6 text-center">
        <h1 className="text-3xl font-bold text-white">Bienvenue 👋</h1>
        <p className="text-lg text-white/90 mt-2 transition-all duration-500">{welcomeMessage}</p>
        <div className="mt-6 p-6 bg-white/10 rounded-xl shadow-md border border-white/20">
          <h2 className="text-2xl font-semibold text-white">{user.prenom} {user.nom}</h2>
          <p className="text-white/90 mt-2">
            Nous sommes heureux de vous revoir. Profitez de votre journée ! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
