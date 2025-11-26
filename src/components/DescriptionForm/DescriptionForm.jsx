import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { create } from "../../api/apiDescription.js";
import { PlusSquareFill, DashSquareFill } from "react-bootstrap-icons";
import DOMPurify from 'dompurify';
import "./DescriptionForm.scss";

function DescriptionForm({ onAction }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [number, setNumber] = useState(1);
    const [showForm, setShowForm] = useState(false);

function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = DOMPurify.sanitize(title);
    const cleanText = DOMPurify.sanitize(text);
    const cleanNumber = DOMPurify.sanitize(number.toString());

    const formData = new FormData();
    formData.append("title", cleanTitle);
    formData.append("text", cleanText);
    formData.append("number", cleanNumber);
    if (imageFile) formData.append("image", imageFile);

    create(formData)
        .then((response) => {
            console.log("Description créée :", response);
            resetForm();
            if (onAction) onAction();
        })
        .catch((error) => console.error("Erreur :", error));
}


    function resetForm() {
        setTitle("");
        setText("");
        setImageFile(null);
        setNumber(1);
    }

    return (
        <div className="description__form__wrapper">
            <div
                className="description__icon__container"
                tabIndex={0}
                onClick={() => setShowForm(!showForm)}
                aria-label={showForm ? "Cacher le formulaire d'ajout de description" : "Afficher le formulaire d'ajout de description"}
            >
                {showForm ? (
                    <DashSquareFill size={40} className="minus__icon"/>
                ) : (
                    <PlusSquareFill size={40} className="plus__icon"/>
                )}
            </div>

            {showForm && (
                <Form
                    onSubmit={handleSubmit}
                    method="post"
                    encType="multipart/form-data"
                    id="addDescription"
                    className="description__form"
                >
                    <h2 className="form__title">Ajouter une description</h2>

                    <div className="form__group__container description__form__group__container">
                        <div className="description__group__container">
                            <Form.Group className="form__group mb-3">
                                <Form.Label className="form__label">Titre</Form.Label>
                                <Form.Control
                                    className="form__input"
                                    type="text"
                                    value={title}
                                    placeholder="Entrez le titre"
                                    aria-label="Titre de la description"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="form__group mb-3">
                                <Form.Label className="form__label">Numéro</Form.Label>
                                <Form.Select
                                    className="form__input"
                                    value={number}
                                    aria-label="Numéro de la description"
                                    onChange={(e) => setNumber(Number(e.target.value))}
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="form__group mb-3">
                                <Form.Label className="form__label">Image</Form.Label>
                                <Form.Control
                                    className="form__input"
                                    type="file"
                                    aria-label="Ajouter une image de description"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="form__group mb-3">
                            <Form.Label className="form__label">Texte</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className="form__input"
                                value={text}
                                placeholder="Entrez le texte"
                                aria-label="Texte de la description" 
                                onChange={(e) => setText(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    <div className="form__button__container">
                        <Button className="description__form__button" type="submit">
                            Créer
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
}

export default DescriptionForm;
