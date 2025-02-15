import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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
    
    axios.get(url)
      .then((response) => {
        const result = user.admin
          ? response.data.flatMap((userData) =>
              userData.request.map((req) => ({ ...req, userId: userData.id }))
            )
          : response.data.request;
        setRequests(result || []);
      })
      .catch((err) => console.error("Erreur de récupération des demandes :", err));
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Le titre et la description sont obligatoires !");
      return;
    }

    axios.get(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${user.id}`)
      .then((response) => {
        const userData = response.data;

        const updatedRequests = [
          ...userData.request,
          {
            title,
            description,
            status: "pending",
            id: Date.now(),
          },
        ];

        axios.put(
          `https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${user.id}`,
          { ...userData, request: updatedRequests }
        )
          .then(() => {
            alert("Demande ajoutée avec succès !");
            setTitle("");
            setDescription("");
            setError("");
            fetchRequests();
          })
          .catch(() => setError("Une erreur s'est produite. Veuillez réessayer."));
      })
      .catch(() => setError("Une erreur s'est produite. Veuillez réessayer."));
  };

  const handleStatusUpdate = (reqId, status, userId) => {
    axios.get(`https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${userId}`)
      .then((response) => {
        const userData = response.data;

        const updatedRequests = userData.request.map((req) =>
          req.id === reqId ? { ...req, status } : req
        );

        axios.put(
          `https://6761885646efb37323720ccc.mockapi.io/loginStagaires/${userId}`,
          { ...userData, request: updatedRequests }
        )
          .then(() => {
            alert(`Demande ${status === "approved" ? "acceptée" : "rejetée"} avec succès !`);
            fetchRequests();
          })
          .catch((err) => console.error("Erreur de mise à jour :", err));
      })
      .catch((err) => console.error("Erreur de mise à jour :", err));
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-3xl bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Gestion des demandes
      </h2>

      {user?.admin ? (
        <>
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Toutes les demandes</h4>
          <div className="space-y-4">
            {requests.length > 0 ? (
              requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md border-l-4 border-blue-500 flex justify-between items-center"
                >
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800">{req.title}</h5>
                    <p className="text-gray-600">{req.description}</p>
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${
                      req.status === "pending" ? "bg-yellow-500" :
                      req.status === "approved" ? "bg-green-500" : "bg-red-500"
                    }`}>
                      {req.status === "pending" ? "En attente" : req.status === "approved" ? "Acceptée" : "Rejetée"}
                    </span>
                  </div>
                  {req.status === "pending" && (
                    <div>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                        onClick={() => handleStatusUpdate(req.id, "approved", req.userId)}
                      >
                        ✔ Accepter
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg ml-2 hover:bg-red-600 transition"
                        onClick={() => handleStatusUpdate(req.id, "rejected", req.userId)}
                      >
                        ✖ Rejeter
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">Aucune demande trouvée.</p>
            )}
          </div>
        </>
      ) : (
        <>
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Ajouter une demande</h4>
          <form onSubmit={handleAddRequest} className="mb-6">
            <input
              type="text"
              placeholder="Titre"
              className="w-full p-2 border rounded-md mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded-md mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            {error && <div className="text-red-500 mb-3">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Ajouter
            </button>
          </form>

          <h4 className="text-xl font-semibold text-gray-700 mb-4">Vos demandes</h4>
          <div className="space-y-4">
            {requests.length > 0 ? (
              requests.map((req) => (
                <div key={req.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h5 className="text-lg font-semibold text-gray-800">{req.title}</h5>
                  <p className="text-gray-600">{req.description}</p>
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${
                    req.status === "pending" ? "bg-yellow-500" : "bg-green-500"
                  }`}>
                    {req.status === "pending" ? "En attente" : "Acceptée"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Aucune demande trouvée.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Request;
