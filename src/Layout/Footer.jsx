import { FaFacebook, FaInstagram } from "react-icons/fa";
import useDynamicColor from "../Components/useDynamicColor";


const FooterSection = () => {
  const { backgroundColor } = useDynamicColor();


  return (
    <footer
      className="text-center text-white py-3"
      style={{ backgroundColor: backgroundColor }}
    >
      <p className="mb-1">
        Instituts Spécialisés de Technologie Appliquée, Hay Salam, Salé
      </p>
      <div>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="text-white me-3"
        >
          <FaFacebook size={20} className="me-2" /> Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-white"
        >
          <FaInstagram size={20} className="me-2" /> Instagram
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
