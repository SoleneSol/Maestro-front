import "./ProjectForm.scss";
import { createProject } from "../../api/apiProjectForm.js";
import { useState,useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserContext from "../../UserContext.jsx";
import { notify } from "../Toast/Toast.jsx";
import DOMPurify from "dompurify";


function ProjectForm() {

    const [name, setName] = useState(""); // nom du projet
    const [resume, setResume] = useState(""); // résumé du projet
    const [deadline, setDeadline] = useState (""); // date limite du projet

    // rafraichi la liste de projet
    const {needRefreshProjectList} = useContext(UserContext)

    // envoie le nouveau projet à l’API
    async function handleCreateProject (e) {
        e.preventDefault(); // empêche la page de se recharger


        let projectData;

        // ajoute la deadline si présente
        if (deadline !='' ){ 
            projectData = { 
                name: DOMPurify.sanitize(name), // nettoie name
                resume: DOMPurify.sanitize(resume), // nettoie description
                deadline: DOMPurify.sanitize(deadline) // nettoie deadline
            };
        } else {
            // sinon que le nom et description
            projectData = { 
                name: DOMPurify.sanitize(name),
                resume: DOMPurify.sanitize(resume),
            };
        }

        // TEST DOMPURIFY 
        // console.log("name brut:", name);        
        // console.log("name nettoyé:", DOMPurify.sanitize(name));
        

        // envoie le projet puis rafraîchit la liste
        await createProject(projectData);
        needRefreshProjectList()
        notify("Demande envoyée") // message TOAST 
    };

    return (
        <Form className="project-frm" onSubmit={(e) => handleCreateProject(e)} aria-labelledby="form-title"> 
        {/* onSubmit = exécute la fonction "handleCreateProject" quand le formulaire est soumis */}
            <h2 className="title">Nouvelle demande de projet</h2>

            {/* TITRE du projet */}
            <Form.Group controlId="FormTitleProject">
                <Form.Label className="form__title" >Titre du projet*</Form.Label>
                <Form.Control
                    required
                    aria-required="true"
                    aria-label="Titre du projet, champ obligatoire"
                    className="form__titleInput"
                    type="text"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)} // Met à jour le titre du projet
                />
            </Form.Group>

            {/*DESCRIPTION */}
            <Form.Group
                className="form__Description"
                controlId="FormDescription"
            >
                <Form.Label>Description du projet*</Form.Label>
                <Form.Control
                    required
                    aria-required="true"
                    aria-label="Description du projet, champ obligatoire"
                    className="form__descriptionInput"
                    as="textarea"
                    rows={4}
                    defaultValue={resume}
                    onChange={(e) => setResume(e.target.value)} // Met à jour la description du projet
                />
            </Form.Group>

            {/* DATE LIMITE */}
            <Form.Group className="form__deadline" controlId="FormDeadline">
                <Form.Label>Date limite</Form.Label>
                <Form.Control
                    aria-label="Date limite du projet, champ optionnel"
                    className="form__deadlineInput"
                    type="date"
                    defaultValue={deadline}
                    onChange={(e) => setDeadline(e.target.value)} // Met à jour la deadline du projet
                />
            </Form.Group>

            {/* BOUTON ENVOYER */}
            <Button className="form__button" variant="primary" type="submit" aria-label="Envoyer la demande de projet">
                Envoyer ma demande
            </Button>

            <p className="form__champsObligatoire">*champs obligatoires</p>
        </Form>
        
    );
}

export default ProjectForm;
