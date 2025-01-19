import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [requests, setRequests] = useState([]);

  // Récupérer toutes les demandes
  const fetchRequests = () => {
    axios
      .get(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des demandes :", err);
      });
  };

  // Modifier le statut d'une demande
  const handleUpdateStatus = (id, status) => {
    axios
      .put(
        `https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${id}`,
        { status }
      )
      .then(() => {
        fetchRequests();
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Gestion des demandes</h2>
      {requests.map((req) => (
        <div key={req.id}>
          <h3>{req.title}</h3>
          <p>{req.description}</p>
          <p>Status: {req.status}</p>
          {req.status === "pending" && (
            <>
              <button onClick={() => handleUpdateStatus(req.id, "approved")}>
                Approuver
              </button>
              <button onClick={() => handleUpdateStatus(req.id, "rejected")}>
                Rejeter
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Admin;