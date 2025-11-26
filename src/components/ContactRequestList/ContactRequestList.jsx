import { useEffect, useState } from "react";
import { findAll, deleteMessage, update } from "../../api/apiMessageContact";
import "./ContactRequestList.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { notify } from "../Toast/Toast.jsx";

function ContactRequestList() {
    /* request est une variable d'état contenant la liste de demande de contact 
    setRequest est la fonction permettant de mettre à jour cet état
    l'état initial est un tableau vide*/
    const [requests, setRequests] = useState([]);

    const [requestToDelete, setRequestToDelete] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* getAllRequestList est une fonction asynchrome qui appelle findAll() 
    pour récupérer toutes les demandes de contact depuis l'API */
    async function getAllRequestList() {
        const allRequestList = await findAll();
        setRequests(allRequestList);
    }

    /* handleUpdate fonction asynchrome qui appelle update(id, newStatus)
    setRequests reçois en argument listes la liste actuelle des demandes
    le liste.map créer un nouveaux tableaux où chaque élèment est vérifié
    elle met à jour la liste requests: 
    Si  request.id est strictement égale  id 
    Alors on retourne un nouvel objet qui est une copie de request 
    (grâce au spread operator ...request), mais avec la propriété status mise à jour à la valeur newStatus.
    Sinon, on ne modifie rien .
    */
    async function handleUpdate(id, newStatus) {
        await update(id, newStatus);
        setRequests((lists) =>
            lists.map((request) =>
                request.id === id ? { ...request, status: newStatus } : request
            )
        );
    }

    /* handleDelete reçois l'id de la demande à supprimer
    elle appelle deleteMessage(id) pour supprimer côté serveur
    setRequests reçois en argument listes la liste actuelle des demandes
    puis elle met à jour la liste requests en filtrant l'objet correspondant à cet id*/
    async function handleDelete(id) {
        await deleteMessage(id);
        setRequests((lists) => lists.filter((request) => request.id !== id));
    }
    // pour le rendu affiche la liste des messages dès le chargement de la page
    useEffect(() => {
        getAllRequestList();
    }, []);

    return (
        <div className="contact-requests">
            {/* <h3 className="contact-title">Demandes de Contact</h3> */}
            {/*Si la longeur du tableau est stictemennt égal à 0 on affiche aucun
            message pour le moment Sinon on fait un .map pour afficher chaque
            demande dynamique */}
            {requests.length === 0 ? (
                <p className="no-requests">Aucun message pour le moment.</p>
            ) : (
                requests.map((request) => (
                    <div key={request.id} className="request">
                        <h4 className="contact-title">Email : {request.mail}</h4>
                        <p className="contact-texte">Message : {request.message}</p>
                        <p className="contact-status">
                            {/* pour mettre un espace entre statut : est le mot
                            qui suit on utilise ce signe {" "} .
                            
                            Si une valeur est connue on
                            affiche cette valeur sinom on affiche "non lu" par
                            défaults */}
                            Statut :{" "}
                            {request.status ? request.status : "non lu"}
                        </p>

                        <div className="actions">
                            <button
                                /* si request.status est stictement égal à "non lu" on  passe 
                            à lu on moment du clique avec l'appel handleUpdate pour le changement */
                                className="update-button"
                                onClick={() => {
                                    if (request.status === "non lu") {
                                        handleUpdate(request.id, "lu");
                                    }
                                }}
                            >
                                Marquer
                            </button>

                            <button
                                className="delete-button"
                                onClick={() => {
                                    setRequestToDelete(request);
                                    handleShow();
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Supprimer la demande de contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Etes-vous sûr de vouloir supprimer la demande de contact de
                    "{requestToDelete.mail}" ?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClose();
                            setRequestToDelete("");
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete(requestToDelete.id);
                            setRequestToDelete("");
                            handleClose();
                            notify(
                                "Demande de contact supprimée avec succès !"
                            );
                        }}
                    >
                        Supprimer la demande de contact
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ContactRequestList;
