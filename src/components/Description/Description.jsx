import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { PencilSquare, DashSquareFill } from "react-bootstrap-icons";
import {handleUpdateDescription,handleDeleteDescription,} from "../DescriptionAction/DescriptionAction.jsx";
import UserContext from "../../UserContext.jsx";
import { XLg } from "react-bootstrap-icons";
import DOMPurify from 'dompurify';
import "./Description.scss";


function Description({ description, onAction }) {
    const [title, setTitle] = useState(description.title || "");
    const [text, setText] = useState(description.text || "");
    const [imageFile, setImageFile] = useState(null);
    const [showActions, setShowActions] = useState(false);

    // On récupère le rôle utilisateur depuis le contexte
    const { userIs } = useContext(UserContext);

    // Construction de l’URL de l’image à partir de image_link
    const URL_IMAGES = import.meta.env.VITE_IMAGES_URL;
    const imageSrc = description.image_link
        ? `${URL_IMAGES}${description.image_link.split("/").pop()}`
        : null;

    function closeDescription() {
        setShowActions(false);
    }

function handleUpdate() {
    const cleanTitle = DOMPurify.sanitize(title);
    const cleanText = DOMPurify.sanitize(text);
    handleUpdateDescription(description, cleanTitle, cleanText, imageFile, onAction, closeDescription);
}


    function handleDelete() {
        handleDeleteDescription(description.id, onAction, closeDescription);
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-start">
                <div className="description__container">
                    <div className="description__title">
                        <h2 className="description__title__h2">{description.title}</h2>
                        {/* Le bouton crayon n’apparaît que pour les administrateurs */}
                        {userIs === "admin" && (
                            <div
                                className="icon-container"
                                onClick={() => setShowActions(!showActions)}
                                style={{ cursor: "pointer" }}
                            >
                                {showActions ? (
                                    <DashSquareFill size={24} color="#E07A5F" />
                                ) : (
                                    <PencilSquare size={24} color="#3D405B" />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="description__image__container">
                        <img
                            className="description__image"
                            src={imageSrc}
                            alt="présentation du compositeur"
                        />
                    </div>

                    <p className="description__text">{description.text}</p>
                </div>

            </div>

            {/* Le formulaire d’action n’est affiché que pour l’admin */}
            {userIs === "admin" && showActions && (
                <Form
                    className="mt-3 pt-3 update__description"
                >
                    <div className="description__form__title">
                        <h2>Modifier la description</h2>
                        <Button onClick={closeDescription} className="description__close__icon"><XLg size={20}/></Button>
                    </div>
                    <Form.Group className="mb-3 form__group">
                        <Form.Label className="form__label" htmlFor="newTitle">
                            Nouveau titre
                        </Form.Label>
                        <Form.Control
                            className="form__input"
                            id="newTitle"
                            type="text"
                            value={title}
                            aria-label="Ajouter un nouveaux titre"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 form__group">
                        <Form.Label className="form__label" htmlFor="newText">
                            Nouveau texte
                        </Form.Label>
                        <Form.Control
                            className="form__input"
                            as="textarea"
                            rows={4}
                            id="newText"
                            value={text}
                            aria-label="Ajouter un nouveaux texte"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 form__group">
                        <Form.Label className="form__label" htmlFor="newImage">
                            Nouvelle image
                        </Form.Label>
                        <Form.Control
                            className="form__input"
                            id="newImage"
                            type="file"
                            aria-label="Ajouter une nouvelle image"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </Form.Group>

                    <div className="d-flex form__button__container">
                        <Button
                            variant="warning"
                            className="preview__form__button me-2"
                            onClick={handleUpdate}
                            aria-label="Mettre à jour la description"
                        >
                            Mettre à jour
                        </Button>
                        <Button
                            variant="danger"
                            className="preview__form__button preview__form__button--delete"
                            onClick={handleDelete}
                            aria-label="Supprimer la description"
                        >
                            Supprimer
                        </Button>
                    </div>
                </Form>
            )}
        </>
    );
}
export default Description;
