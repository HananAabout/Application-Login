import { useEffect, useState } from "react";
import axios from "axios";

const ListeUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // ID de l'utilisateur en cours d'édition
  const [editUserData, setEditUserData] = useState({ nom: "", prenom: "" }); // Données de l'utilisateur à modifier

  useEffect(() => {
    axios
      .get("https://6761885646efb37323720ccc.mockapi.io/loginStagaires")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Supprimer un utilisateur
  const handleDelete = (userId) => {
    axios
      .delete(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Activer le mode édition pour un utilisateur
  const handleEdit = (user) => {
    setEditUserId(user.id); // Définit l'ID de l'utilisateur en cours d'édition
    setEditUserData({ nom: user.nom, prenom: user.prenom }); // Préfille les données de l'utilisateur
  };

  // Mettre à jour l'utilisateur
  const handleUpdate = () => {
    axios
      .put(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${editUserId}`, editUserData)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === editUserId ? response.data : user
          )
        );
        setEditUserId(null); // Quitte le mode édition
        setEditUserData({ nom: "", prenom: "" }); // Réinitialise les données
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Liste des Utilisateurs</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={editUserData.nom}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, nom: e.target.value })
                      }
                      className="form-control"
                    />
                  ) : (
                    user.nom
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={editUserData.prenom}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, prenom: e.target.value })
                      }
                      className="form-control"
                    />
                  ) : (
                    user.prenom
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleUpdate}
                    >
                      Sauvegarder
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Modifier
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
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
