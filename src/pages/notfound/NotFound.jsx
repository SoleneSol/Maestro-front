import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
    return (
        <div>
            <h1 className="title-main">404</h1>
            <h2 className="subtitle">Page non trouvée</h2>
            <p className="text-center">
                La page que vous recherchez est introuvable
            </p>
            <div className="link-container">
                <Link to="/">Retour à l'accueil</Link>
            </div>
        </div>
    );
}

export default NotFound;
