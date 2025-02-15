import { useSelector } from "react-redux";
import { FaUser, FaBirthdayCake, FaEnvelope, FaMapMarkerAlt, FaPalette } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white text-center py-6 rounded-t-lg shadow-lg">
            <h3 className="text-2xl font-semibold">Mon Profil</h3>
          </div>
          <div className="bg-white p-6 rounded-b-lg shadow-lg">
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b pb-4">
                <FaUser className="text-blue-500 text-xl" />
                <div className="flex-grow pl-4">
                  <strong className="text-gray-700">Nom:</strong>
                  <span className="text-gray-900 font-medium">{user.nom}</span>
                </div>
              </li>
              <li className="flex justify-between items-center border-b pb-4">
                <FaUser className="text-blue-500 text-xl" />
                <div className="flex-grow pl-4">
                  <strong className="text-gray-700">Prénom:</strong>
                  <span className="text-gray-900 font-medium">{user.prenom}</span>
                </div>
              </li>
              <li className="flex justify-between items-center border-b pb-4">
                <FaBirthdayCake className="text-blue-500 text-xl" />
                <div className="flex-grow pl-4">
                  <strong className="text-gray-700">Âge:</strong>
                  <span className="text-gray-900 font-medium">{user.age}</span>
                </div>
              </li>
              <li className="flex justify-between items-center border-b pb-4">
                <FaEnvelope className="text-blue-500 text-xl" />
                <div className="flex-grow pl-4">
                  <strong className="text-gray-700">Email:</strong>
                  <span className="text-gray-900 font-medium">{user.email}</span>
                </div>
              </li>
              <li className="flex justify-between items-center border-b pb-4">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                <div className="flex-grow pl-4">
                  <strong className="text-gray-700">Pays:</strong>
                  <span className="text-gray-900 font-medium">{user.pays}</span>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <FaPalette className="text-blue-500 text-xl" />
                <div className="flex-grow pl-4">
                  <strong className="text-gray-700">Couleur:</strong>
                  <span className="text-gray-900 font-medium">{user.couleur}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
