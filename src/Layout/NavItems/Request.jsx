import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      fetchRequests();
    }
  }, []);

  const fetchRequests = () => {
    const url = user.admin
      ? "https://6761885646efb37323720ccc.mockapi.io/loginStagaires"
      : `https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${user.id}`;

    axios
      .get(url)
      .then((response) => {
        const result = user.admin
          ? response.data.flatMap((userData) =>
              userData.request.map((req) => ({ ...req, userId: userData.id }))
            )
          : response.data.request;
        setRequests(result || []);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des demandes :", err);
      });
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Le titre et la description sont obligatoires !");
      return;
    }

    axios
      .get(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${user.id}`)
      .then((response) => {
        const userData = response.data;
        const updatedRequests = [
          ...userData.request,
          {
            title,
            description,
            status: "En attente", // Stocker directement en français
            id: Date.now(),
          },
        ];

        return axios.put(
          `https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${user.id}`,
          { ...userData, request: updatedRequests }
        );
      })
      .then(() => {
        alert("Demande ajoutée avec succès !");
        setTitle("");
        setDescription("");
        setError("");
        fetchRequests();
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout de la demande :", err);
        setError("Une erreur s'est produite. Veuillez réessayer.");
      });
  };

  const handleStatusUpdate = (reqId, status, userId) => {
    const statusMapping = {
      approved: "Acceptée",
      rejected: "Rejetée",
      cancelled: "Annulée",
    };

    axios
      .get(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${userId}`)
      .then((response) => {
        const userData = response.data;
        const updatedRequests = userData.request.map((req) =>
          req.id === reqId ? { ...req, status: statusMapping[status] } : req
        );

        return axios.put(
          `https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${userId}`,
          { ...userData, request: updatedRequests }
        );
      })
      .then(() => {
        alert(
          `Demande ${
            statusMapping[status]
          } avec succès !`
        );
        fetchRequests();
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Gestion des demandes</h2>
      {user?.admin ? (
        <>
          <h4>Toutes les demandes</h4>
          {requests.length > 0 ? (
            <div className="list-group">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{req.title}</h5>
                    <p className="mb-1">{req.description}</p>
                    <small>Utilisateur ID : {req.userId}</small>
                    <br />
                    <span
                      className={`badge bg-${
                        req.status === "En attente"
                          ? "warning"
                          : req.status === "Acceptée"
                          ? "success"
                          : req.status === "Rejetée"
                          ? "danger"
                          : "secondary"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  {req.status === "En attente" && (
                    <div>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          handleStatusUpdate(req.id, "approved", req.userId)
                        }
                      >
                        Accepter
                      </button>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() =>
                          handleStatusUpdate(req.id, "rejected", req.userId)
                        }
                      >
                        Rejeter
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          handleStatusUpdate(req.id, "cancelled", req.userId)
                        }
                      >
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>Aucune demande trouvée.</p>
          )}
        </>
      ) : (
        <>
          <h4>Ajouter une demande</h4>
          <form onSubmit={handleAddRequest} className="mb-5">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Titre
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </form>

          <h4>Vos demandes</h4>
          {requests.length > 0 ? (
            <div className="list-group">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{req.title}</h5>
                    <p className="mb-1">{req.description}</p>
                    <span
                      className={`badge bg-${
                        req.status === "En attente" ? "warning" : "success"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucune demande trouvée.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Request;
