import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import useDynamicColor from "../Components/useDynamicColor";

const FooterSection = () => {
  const { backgroundColor } = useDynamicColor();

  return (
    <footer
      className="text-center text-white py-6"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="flex justify-center items-center space-x-6 mb-4">
        <a
          href="https://www.facebook.com/share/17P4JTK3so/?mibextid=wwXIfr"
          target="_blank"
          rel="noreferrer"
          className="text-white hover:text-blue-500 transition"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://www.instagram.com/hanan_abt/profilecard/?igsh=cnZlb2ZpMGF2MW1v"
          target="_blank"
          rel="noreferrer"
          className="text-white hover:text-pink-500 transition"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/hanan-aabout-847a622b7/"
          target="_blank"
          rel="noreferrer"
          className="text-white hover:text-blue-700 transition"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/HananAabout" // Replace with your GitHub URL
          target="_blank"
          rel="noreferrer"
          className="text-white hover:text-gray-500 transition"
        >
          <FaGithub size={24} />
        </a>
      </div>
      <hr className="border-gray-500 my-4" />
      <div className="mt-4 flex justify-center space-x-6">
        <a
          href="/privacy-policy"
          className="text-white hover:text-gray-300 transition"
        >
          Instituts Spécialisés de Technologie Appliquée (ISTA).
        </a>
      </div>
      <div className="mt-4 text-gray-300">
        © 2025 Tous droits réservés.
      </div>
    </footer>
  );
};
export default FooterSection;
