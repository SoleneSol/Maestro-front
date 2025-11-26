import "./Legales.scss";


function Legales() {
    return (
        <div className="legales">
            <main className="legales__main">
                <h2 className="legales__title">Mentions Légales</h2>
                <p className="legales__text">
                    Éditeur du site : Nom de la société ou du responsable
                </p>
                <p className="legales__text">Adresse : Adresse complète</p>
                <p className="legales__text">Téléphone : 00 00 00 00 00</p>
                <p className="legales__text">Email : contact@exemple.com</p>
                <p className="legales__text">
                    Hébergeur : Nom de l'hébergeur - Adresse - Téléphone
                </p>
                <p className="legales__text">
                    SIRET/RCS : Numéro d'immatriculation
                </p>
                <p className="legales__text">
                    Directeur de la publication : Nom du responsable
                </p>
            </main>
        </div>
    );
}

export default Legales;
