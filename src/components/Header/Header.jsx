// Header.jsx
import React, { useContext , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import clientIcon from "../../assets/images/user-client.svg";
import adminIcon from "../../assets/images/user-admin.svg";
import UserContext from "../../UserContext.jsx";
import "./Header.scss";
import { logoutUser } from "../../api/apiUser.js";
import { useAxiosInterceptor } from "../../api/axiosConfig.js";
import { getMyProfile } from "../../api/apiUser.js";

/*useContext(UserContext) récupère les données partagées dans le contexte utilisateur.
userIs : indique le rôle actuel (admin, client, visitor).
logoutProvider : fonction pour déconnecter l’utilisateur.
useNavigate() retourne une fonction navigate pour effectuer une redirection.*/
function Header() {
    const { userIs, logoutProvider, loginProvider } = useContext(UserContext);
    const navigate = useNavigate();
    
    // active l'interceptor du axios config
    useAxiosInterceptor();

    // Cette fonction peut être utilisée pour rafraîchir
    //  le contexte utilisateur si nécessaire
    async function refreshContext() {

        // si getMyProfile réussit, on met à jour le contexte
        const profile = await getMyProfile();

        if (profile) {
            loginProvider(profile.user.role);
        }
    }

    //ajout pour gestion de la perte de contexte utilisateur
    useEffect(() => {
        console.log("userIs changed:", userIs);

        // Si le rôle devient "visitor", 
        // on tente de rafraîchir le contexte
        if (userIs === "visitor") {
        console.log("userIs lost:", userIs);
        refreshContext();
        }
        // autre action à chaque changement de rôle...
    }, [userIs]);


    const commonLinks = [
        { label: "Accueil", to: "/" },
        { label: "Compositions", to: "/compositions" },
    ];

/* Lorsqu’on clique sur « Se déconnecter », cette fonction :
Appelle logoutProvider() pour se déconnecter à la session utilisateur.
Redirige vers la page d’accueil.*/
    async function handleLogout () {
        try {
            await logoutUser(); // deconnexion de user
            logoutProvider(); // retourne à l'état de visiteur
            navigate("/"); // redirection vers la page d'accueil
        } catch (error) {
            console.log("erreur logout :", error);
        }
    };

/* Si l’utilisateur est admin affiche adminIcon.
Si client affiche clientIcon.
Si visiteur  pas d’icône.
 */
    const iconSrc =
        userIs === "admin"
            ? adminIcon
            : userIs === "client"
            ? clientIcon
            : null;

            /* .map qui affiche les liens dynamiquement */
    return (
        <header>
            <img src="logo.png" alt="logo maestro" className="logo" />
            <nav>
                <ul className="nav-list">
                    {commonLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to}>{link.label}</Link>
                        </li>
                    ))}

                    {userIs !== "visitor" ? (
                        <li>
                            <Dropdown >
                                <Dropdown.Toggle
                                    variant="link"
                                    id="dropdown-user"
                                /*    p-0 "padding 0"
                                    border-0 pas de bordure
                                    pour basculer nav-icon-toggle */
                                    className="p-0 border-0 nav-icon-toggle"
                                >
                                    <img
                                        src={iconSrc}
                                        alt={
                                            userIs === "admin"
                                                ? "Icône admin"
                                                : "Icône client"
                                        }
                                        className="nav-icon"
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Header>
                                        Espace {userIs}
                                    </Dropdown.Header>

                                    {userIs === "admin" && (
                                        <Dropdown.Item as={Link} to="/admin">
                                            Mon espace
                                        </Dropdown.Item>
                                    )}
                                    
                                    {userIs === "client" && (
                                        <Dropdown.Item as={Link} to="/user">
                                            Mon espace
                                        </Dropdown.Item>
                                    )}
                                    <Dropdown.Divider/>
                                    <Dropdown.Item as={Link} to="/user/settings">
                                        Paramètre de compte
                                    </Dropdown.Item>
                                    <Dropdown.Divider/>

                                    <Dropdown.Item onClick={handleLogout}>
                                        Se déconnecter
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    ) : (
                        /* si on n'est pas connecté on affiche le lien connexion/inscription. */
                        <li>
                            <Link to="/login">Connexion / Inscription</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
