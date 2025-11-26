import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../DataForm.scss";
import { useState, useEffect, useContext } from "react";
import {
    getMyProfile,
    updateMyProfile,
    logoutUser,
} from "../../../api/apiUser.js";
import { notify } from "../../Toast/Toast.jsx";
import UserContext from "../../../UserContext.jsx";
import DOMPurify from "dompurify";

function UserDataForm() {
    const [setting, setSetting] = useState({});
    const { userIs, logoutProvider } = useContext(UserContext);

    async function getMySetting() {
        const myProfile = await getMyProfile();
        if (myProfile.user.isActive == false) {
            await logoutUser(); // deconnexion de user
            logoutProvider(); // retourne à l'état de visiteur
        }
        setSetting(myProfile.user);
    }

    useEffect(() => {
        getMySetting();
    }, []);

    async function handelSubmit(event) {
        event.preventDefault();
        await updateMyProfile(setting);
        getMySetting();
        notify("Vos informations ont bien été mise à jour", "success");
    }

    function handleSwitch(event) {
        setSetting((prevSetting) => ({
            ...prevSetting,
            isActive: !event.target.checked,
        }));
    }
    // Déconnexion automatique après avoir désactivé le compte en V2

    return (
        <>
            <Container className="dataForm-container">
                <Row>
                    {/* PARTICULIER */}
                    <Col>
                        <Form
                            className="profile-form"
                            method="post"
                            onSubmit={(event) => handelSubmit(event)}
                            aria-labelledby="user-profil-title"
                        >
                            <Container className="profil-item">
                                {/* EN-TETE */}
                                <Row className="profil-item-header">
                                    <Col>
                                        <h1
                                            id="user-profil-title"
                                            className="profil-item-header-title"
                                        >
                                            Mon Profil
                                        </h1>
                                    </Col>
                                </Row>

                                {/* NOM */}
                                <Row className="item lastname-item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="lastname"
                                    >
                                        <Form.Label>Nom</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type="text"
                                            placeholder="Votre nom"
                                            defaultValue={
                                                setting?.lastname
                                                    ? setting.lastname
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                setSetting((prevSetting) => ({
                                                    ...prevSetting, // ← on copie l’ancien objet
                                                    lastname:
                                                        DOMPurify.sanitize(
                                                            event.target.value
                                                        ), // ← on remplace seulement fistname
                                                }))
                                            }
                                        />
                                    </Form.Group>
                                </Row>

                                {/* PRENOM */}
                                <Row className="item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="firstname"
                                    >
                                        <Form.Label>Prénom</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type="text"
                                            placeholder="Votre prénom"
                                            defaultValue={
                                                setting?.firstname
                                                    ? setting.firstname
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                setSetting((prevSetting) => ({
                                                    ...prevSetting,
                                                    firstname:
                                                        DOMPurify.sanitize(
                                                            event.target.value
                                                        ),
                                                }))
                                            }
                                        />
                                    </Form.Group>
                                </Row>

                                {/* EMAIL */}
                                <Row className="item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="email"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            required
                                            className="profile-form-item-input"
                                            type="email"
                                            placeholder="Votre email"
                                            defaultValue={
                                                setting?.email
                                                    ? setting.email
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                setSetting((prevSetting) => ({
                                                    ...prevSetting,
                                                    email: DOMPurify.sanitize(
                                                        event.target.value
                                                    ),
                                                }))
                                            }
                                        />
                                    </Form.Group>
                                </Row>

                                {/* ADRESSE*/}
                                <Row className="item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="localisation"
                                    >
                                        <Form.Label>Adresse</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type="text"
                                            placeholder="Votre adresse"
                                            defaultValue={
                                                setting?.localisation
                                                    ? setting.localisation
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                setSetting((prevSetting) => ({
                                                    ...prevSetting,
                                                    localisation:
                                                        DOMPurify.sanitize(
                                                            event.target.value
                                                        ),
                                                }))
                                            }
                                        />
                                    </Form.Group>
                                </Row>

                                {/* NUMERO DE TELEPHONE*/}
                                <Row className="item profile-item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="phonenumber"
                                    >
                                        <Form.Label>
                                            Numero de téléphone
                                        </Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type="tel"
                                            placeholder="Votre numero de téléphone"
                                            defaultValue={
                                                setting?.phonenumber
                                                    ? setting.phonenumber
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                setSetting((prevSetting) => ({
                                                    ...prevSetting,
                                                    phonenumber:
                                                        DOMPurify.sanitize(
                                                            event.target.value
                                                        ),
                                                }))
                                            }
                                        />
                                    </Form.Group>
                                </Row>

                                {/* DESACTIVER SON COMPTE */}
                                {userIs === "client" && (
                                    <Row className="item profile-item">
                                        <Form.Group className="profile-form-item profile-form-item-toggle">
                                            <Form.Check
                                                className="form__input"
                                                name="disable"
                                                type="switch"
                                                id="disable-user"
                                                label="Désactiver mon compte"
                                                aria-describedby="disable-user-help"
                                                defaultChecked={
                                                    setting?.isActive
                                                        ? setting.isActive
                                                        : false
                                                }
                                                onChange={handleSwitch}
                                            />
                                            <p
                                                id="disable-user-help"
                                                className="disable-help-text"
                                            >
                                                Attention ! En cliquant sur
                                                "désactiver mon compte", je ne
                                                pourrai plus me connecter
                                            </p>
                                        </Form.Group>
                                    </Row>
                                )}

                                {/* BOUTTON */}
                                <Row className="item-button">
                                    <Button
                                        className="mofifier-button"
                                        variant="mofifier-button"
                                        type="submit"
                                    >
                                        Modifier
                                    </Button>
                                </Row>
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserDataForm;
