import { Card, Badge, Row, Col, Button } from "react-bootstrap";
import { getAllProjectList, getFilteredProjectList } from "../../api/apiProjectList.js";
import { getAllAdminProjects, getFilteredAdminProjects, updateProjectStatus, deleteProject  } from "../../api/apiProjectList.js";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext.jsx";
import Form from 'react-bootstrap/Form';
import "./ProjectList.scss";
import { Trash } from "react-bootstrap-icons";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';



function ProjectList() {

    const [projectList, setProjectList] = useState([]); // liste des projets
    const [statusList, setStatusList] = useState ([]); // tous les statuts disponibles


    
    // fenêtre Modal (être vous sûr de vouloir supprimer)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false); // ferme la modal
    const handleShow = () => setShow(true); // ouvre la modal



    // Récupère les infos du UserContext
    const {userIs,refreshList, desactiveRefreshProjectList} = useContext(UserContext);
    console.log('role après context', userIs);
    // Permet de rediriger l'utilisateur
    const navigate = useNavigate();


    // charge les projets selon le rôle de l’utilisateur
    async function getProjects() {
        // si VISITOR
        if (userIs === 'visitor') {
            navigate("/");   
        }
        // si CLIENT
        if (userIs === 'client'){ 
            const result = await getAllProjectList();
            setStatusList (result.Liststatus);
            setProjectList(result.projects);
        } else if (userIs === 'admin'){ 
            // si ADMIN
            const result = await getAllAdminProjects();
            setStatusList (result.Liststatus);
            setProjectList(result.projects);
        }
    }


    // charge les projets filtrés par statut
    async function getStatusProject(status) {
        // si CLIENT
        if (userIs === 'client'){ 
            const result  = await getFilteredProjectList(status);
            console.log("client:",result.projects);
            setProjectList(result.projects);
        } else if (userIs === 'admin') {
            // si ADMIN
            const result  = await getFilteredAdminProjects(status);
            console.log("admin:", result);
            setProjectList(result.projects);
        }
    }


    
    // met à jour l’affichage selon le filtre choisi
    function handleChange(e) {
        e.preventDefault(); // empêche le rechargement par défaut
        const status = e.target.value;

        if (status === "") {
            getProjects(); // affiche toute la liste des statut
        } else {
            getStatusProject(status); // affiche le statut choisi 
        }
    }


    // modifie le statut d’un projet
    async function handleChangeStatus(e) {
        e.preventDefault();
        await updateProjectStatus(e.target.selectedOptions[0].id, e.target.value);
        // e.target c’est le <select>
        // e.target.value c’est le nouveau statut choisi (ex : "en cours")
        // e.target.selectedOptions[0].id  c’est l’ID du projet
    }

        // supprime un projet
        async function handleDelete(id) {
            try {
                await deleteProject(id);
                getProjects();
            } catch (error) {
                console.error("erreur lors de la suppression du projet", error);
            }
        };


    // recharge les projets
    useEffect(() => {
        getProjects();
        desactiveRefreshProjectList();
    }, [refreshList]);


return (
    <section className="title__container">

        {/* FILTRER LES PROJETS */}
        <Form.Select size="lg"onChange={handleChange} aria-label="Trier les projets par statut" className="mb-4 select-margin">
                    
            <option value=''>Trier par statut</option>
            {/* Si la liste de projets & statut n'est pas vide, on affiche la liste des status, sinon on affiche "Pas de statut"*/}
            {(projectList?.length > 0 && statusList.length != 0) ? statusList.map((status) => (
                <option value={status} key={status}>{status}</option>
            ))
            :
                <option>Pas de statut</option>
            }
        </Form.Select>

        {/* LISTE DES PROJETS */}
        <Container>
        <Row className="projects__container">
        {/* si projectList existe (!=null) et n’est pas vide (length != 0), alors affiche la liste des projets avec map, sinon on affiche pas de projet */}
        {(projectList != null && projectList.length != 0) ? projectList.map((project) => (
            <Col key={project.id} className="mb-5" md={12}>
                <Form >
                    <Card 
                        className="projects__card"
                        style={{
                            width: "100%",
                            border: "2px" ,
                        }}
                    >
                    
                        {/* SUPPRESSION PROJET pour l'admin*/}
                        <Card.Body>
                            <div className="project__card__row">
                                {/* ICÔNE POUBELLE  */}
                                <Col xs="auto">
                                {userIs === "admin" && (
                                    <>
                                        < Trash className="project__trash__icon"
                                            size={30} onClick={(e) => {e.preventDefault(); handleShow() }}
                                        />
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Supprimer un projet</Modal.Title>
                                                </Modal.Header>
                                                    <Modal.Body>Etes-vous sur de vouloir supprimer le projet ?</Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Annuler
                                                            </Button>
                                                            <Button variant="primary" onClick={(e) => {e.preventDefault(); handleDelete(project.id); handleClose()}}>
                                                                Supprimer
                                                            </Button>
                                                        </Modal.Footer>
                                            </Modal>
                                    </>
                                )}
                                </Col>

                                <Col className="text-center ">
                                {/* TITRE/NOM du PROJET "en cours" */}
                                    <Badge
                                        pill
                                        aria-label="Nom du projet"
                                        style={{
                                            color: "black",
                                            fontSize: "0.9rem",
                                        }}
                                        className="mb-2 d-block"
                                        bg={userIs === "admin" ? 'color-admin' : 'color-client'}
                                    > 
                                        {project.name}
                                    </Badge>
                                    
                                    {/* DESCRIPTION */}
                                    <p className="border rounded">
                                        {project.resume}
                                    </p>

                                    {/* STATUS du projet CLIENT*/}                                    
                                    {userIs === 'client' &&
                                        <Badge
                                            pill 
                                            aria-label="Statut du projet"
                                            style={{
                                                color: "black",
                                                fontSize: "0.9rem",
                                            }}
                                            className="deadline__badge d-block"
                                            bg={userIs === "admin" ? 'color-admin' : 'color-client'}
                                        >
                                            {project.status}
                                        </Badge>
                                    }
                                    {/* STATUS du projet ADMIN*/}     
                                    {userIs === 'admin' &&
                                    <div>
                                        <section className="update__status">
                                            <Form.Group>
                                                <Form.Label htmlFor="status-select">Selectionner le status</Form.Label>

                                                <Form.Select defaultValue={project.status} onChange={handleChangeStatus} name="status" id="status-select">
                                                    {statusList.length > 0 ?
                                                    statusList.map((status, index) => (
                                                        <option value={status} id={project.id} key={index}>{status}</option>
                                                    )):
                                                    <option value="noStatus">pas de status</option>
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </section>
                                    </div>
                                    }       
                                    
                                    {/* DEADLINE*/}
                                    {project.deadline !=null &&
                                        <Badge
                                            pill 
                                            aria-label="Date limite du projet"
                                            style={{
                                                color: "black",
                                                fontSize: "0.9rem",
                                            }}
                                            className="deadline__badge d-block"
                                            bg={userIs === "admin" ? 'color-admin' : 'color-client'}
                                        >
                                            {project.deadline}
                                        </Badge>
                                    }
                                </Col>
                            </div>
                        </Card.Body>
                    </Card>
                </Form>
            </Col>
        ))
    : <p>Pas de projet</p>}
        </Row>
        </Container>
    </section>
);
}


export default ProjectList;
