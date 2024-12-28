import { useEffect, useState } from "react";
import axios from "axios";
const ListeUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    nom: "",
    prenom: "",
    age: "",
    pays: "",
    email: "",
  });
  const paysOptions = [
    "France",
    "Canada",
    "États-Unis",
    "Maroc",
    "Tunisie",
    "Algérie",
    "Italie",
    "Espagne",
    "Allemagne",
    "Royaume-Uni",
  ];

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
      pays: user.pays,
      email: user.email,
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
          pays: "",
          email: "",
        });
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
              <th>Âge</th>
              <th>Pays</th>
              <th>Email</th>
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
                        setEditUserData({
                          ...editUserData,
                          prenom: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  ) : (
                    user.prenom
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="number"
                      value={editUserData.age}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, age: e.target.value })
                      }
                      className="form-control"
                    />
                  ) : (
                    user.age
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <select
                      value={editUserData.pays}
                      onChange={(e) =>
                        setEditUserData({ ...editUserData, pays: e.target.value })
                      }
                      className="form-select"
                    >
                      <option value="">Sélectionnez un pays</option>
                      {paysOptions.map((pays) => (
                        <option key={pays} value={pays}>
                          {pays}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.pays
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="email"
                      value={editUserData.email}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          email: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  ) : (
                    user.email
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
