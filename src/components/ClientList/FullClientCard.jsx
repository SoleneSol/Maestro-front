import { Container, Row, Col } from "react-bootstrap";
import ClientCard from "./Clientcard/ClientCard.jsx";
import CompanyCard from "./CompanyCard/CompanyCard.jsx";
import "./FullClientCard.scss";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { getAllUsers, getSortedUsers } from "../../api/apiUser.js";

function FullClientCard() {
    const [clients, setClients] = useState([]);

    async function getClients() {
        const clients = await getAllUsers();
        setClients(clients);
    }

    async function getSortedClients(sortedUsers) {
        const clients = await getSortedUsers(sortedUsers);
        setClients(clients);
    }

    function handleChange(event) {
        if (event.target.value === "") {
            getClients();
        } else {
            getSortedClients(event.target.value);
        }
    }

    useEffect(() => {
        getClients();
    }, []);

    return (
        <>
            <div className="client-sort-form-select">
                <Form.Select
                    aria-label="Formulaire de tri des clients par nom ou prénom"
                    onChange={handleChange}
                >
                    <option value="">Trier la liste des clients</option>
                    <option value="lastnameSelected">Par nom</option>
                    <option value="firstnameSelected">Par prénom</option>
                </Form.Select>
            </div>

            <div className="cards-div">
                <Container className="full-client-card-container">
                    {clients != [] &&
                        clients.map((client) => (
                            <Row key={client.id} className="client-card-row ">
                                <Col
                                    sm
                                    className="card-column client-card-column"
                                >
                                    <ClientCard client={client} />
                                </Col>

                                {client.company_id != null && (
                                    <Col
                                        sm
                                        className="card-column company-card-column"
                                    >
                                        <CompanyCard company={client.company} />
                                    </Col>
                                )}
                            </Row>
                        ))}
                </Container>
            </div>
        </>
    );
}

export default FullClientCard;
