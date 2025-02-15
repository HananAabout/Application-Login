import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [requests, setRequests] = useState([]);
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestion des demandes</h2>
      {requests.map((req) => (
        <div
          key={req.id}
          className="bg-white p-4 rounded-lg shadow-lg mb-4"
        >
          <h3 className="text-xl font-semibold">{req.title}</h3>
          <p className="text-gray-700 mb-2">{req.description}</p>
          <p className="text-gray-500 mb-4">Status: {req.status}</p>
          {req.status === "pending" && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdateStatus(req.id, "approved")}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Approuver
              </button>
              <button
                onClick={() => handleUpdateStatus(req.id, "rejected")}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Rejeter
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Admin;
