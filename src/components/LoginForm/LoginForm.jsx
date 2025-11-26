import { loginUser } from "../../api/apiUser.js";
import { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import UserContext from "../../UserContext.jsx";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import { notify } from "../Toast/Toast.jsx";
import DOMPurify from 'dompurify';

function LoginForm({ setUserHasAccount }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { loginProvider } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const cleanEmail = DOMPurify.sanitize(email);  

        const loginData = { email: cleanEmail, password };  

        try {
            const userInfo = await loginUser(loginData);
            if (userInfo) {
                console.log("userInfo", userInfo);
                loginProvider(userInfo.user.role);
                navigate("/");
                notify("Vous êtes connecté.");
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);
            notify("Échec de la connexion. Vérifiez vos identifiants.");
        }
    }

    function handleRegister(event) {
        event.preventDefault();
        setUserHasAccount(false);
    }

    return (
        <div className="login-form-global">
            <h1 className="login-form-headtitle">Connexion</h1>
            <div className="login-form-container"
                aria-label="Formulaire de connexion utilisateur">
                <Form
                    className="login-form"
                    method="post"
                    onSubmit={handleSubmit}
                    aria-describedby="login-form-info"
                >
   {/* EMAIL */}
                    <Form.Group className="login-form-item" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Entrez votre adresse mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            aria-required="true"
                            aria-label="Adresse e-mail"
                            autoComplete="email"
                        />
                    </Form.Group>

                    {/* MOT DE PASSE */}
                    <Form.Group
                        className="login-form-item"
                        controlId="password"
                    >
                        <Form.Label>Mot de passe</Form.Label>
                        <div className="password-wrapper">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                                aria-label="Mot de passe"
                                aria-describedby="password-description"
                                autoComplete="Mot de passe"
                            />
                            <span
                                className="show-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeSlash /> : <Eye />}
                            </span>
                        </div>
                    </Form.Group>

                    <Button className="login-form-button" type="submit" aria-label="Valider la connexion">
                        Se connecter
                    </Button>
                </Form>

                <p className="login-text-link">
                    Pas encore de compte ?{" "}
                    <Link
                        className="login-link"
                        to="/register"
                        onClick={handleRegister}
                        aria-label="Lien vers l'inscription"
                    >
                        Inscrivez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
