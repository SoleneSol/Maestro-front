import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./Contact.scss";
import { create } from "../../api/apiMessageContact";
import { notify } from "../../components/Toast/Toast.jsx";
import DOMPurify from 'dompurify';


function Contact() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

function handleSubmit(event) {
    event.preventDefault();

    const cleanEmail = DOMPurify.sanitize(email);
    const cleanMessage = DOMPurify.sanitize(message);

    const formData = {
        mail: cleanEmail,
        message: cleanMessage,
    };

    create(formData)
        .then((response) => {
            console.log("Message envoyé", response);
            notify("Message envoyé avec succès !");
            setEmail("");
            setMessage("");
        })
        .catch((error) => {
            console.error("L'envoi du message a échoué", error);
            notify("Echec lors de l'envoi du message");
        });
}

    return (
        <div className="contact-page">
            <div className="header-contact">
                <h1 className="contact__page__title">Contactez-nous</h1>
                <p>Les champs marqués d'un astérisque (*) sont obligatoires</p>
            </div>

            <Container className="contact-container">
                <Form method="post" onSubmit={handleSubmit}>
                    <Form.Group className="contact-form-item" controlId="email">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Votre email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            aria-label="Adresse email"
                        />
                    </Form.Group>

                    <Form.Group
                        className="contact-form-item"
                        controlId="message"
                    >
                        <Form.Label>Message *</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Votre message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <div className="form-actions">
                        <Button className="btn btn-primary" type="submit" aria-label="Envoyer le message de contact">
                            Envoyer
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Contact;
