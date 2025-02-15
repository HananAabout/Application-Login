import { useEffect, useState } from "react";
import axios from "axios";

const ListeUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // ID de l'utilisateur en cours d'édition
  const [editUserData, setEditUserData] = useState({
    nom: "",
    prenom: "",
    age: "",
    email: "",
    pays: "",
    couleur: ""
  }); 

  useEffect(() => {
    axios
      .get("https://6761885646efb37323720ccc.mockapi.io/loginStagaires")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };
  const handleEdit = (user) => {
    setEditUserId(user.id); 
    setEditUserData({
      nom: user.nom,
      prenom: user.prenom,
      age: user.age,
      email: user.email,
      pays: user.pays,
      couleur: user.couleur
    });
  };

  const handleUpdate = () => {
    axios
      .put(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${editUserId}`, editUserData)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === editUserId ? response.data : user
          )
        );
        setEditUserId(null); 
        setEditUserData({
          nom: "",
          prenom: "",
          age: "",
          email: "",
          pays: "",
          couleur: ""
        }); 
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-center text-2xl font-bold mb-6">Liste des Utilisateurs</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Prénom</th>
              <th className="border border-gray-300 px-4 py-2">Âge</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Pays</th>
              <th className="border border-gray-300 px-4 py-2">Couleur</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={editUserData.nom}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, nom: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.nom
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={editUserData.prenom}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, prenom: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.prenom
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editUserId === user.id ? (
                    <input
                      type="number"
                      value={editUserData.age}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, age: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.age
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editUserId === user.id ? (
                    <input
                      type="email"
                      value={editUserData.email}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, email: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={editUserData.pays}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, pays: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.pays
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={editUserData.couleur}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, couleur: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.couleur
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editUserId === user.id ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 mr-2"
                      onClick={handleUpdate}
                    >
                      Sauvegarder
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 mr-2"
                      onClick={() => handleEdit(user)}
                    >
                   Modifier
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                    onClick={() => handleDelete(user.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListeUtilisateurs;
