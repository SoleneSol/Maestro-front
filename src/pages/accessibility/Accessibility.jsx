
import "./Accessibility.scss";
import { Link } from "react-router-dom";

function Accessibility() {
    return (
        <div className="accessibility">
            <main className="accessibility__main">
                <h1 className="accessibility__title">Accessibilité</h1>

                <section className="accessibility__section accessibility">
                    <h2 className="accessibility__subtitle">
                        Engagement en faveur de l'accessibilité
                    </h2>
                    <p className="accessibility__text">
                        Ce site respecte les normes d'accessibilité
                        internationales WCAG (Web Content Accessibility
                        Guidelines) afin de permettre à toute personne, y
                        compris les personnes en situation de handicap, de
                        naviguer facilement.
                    </p>
                    <div className="accessibility__recommendations">
                        <p className="accessibility__text">
                            Nous nous engageons à améliorer continuellement
                            l’accessibilité de notre site, en appliquant les
                            recommandations suivantes :
                        </p>

                        <ul className="accessibility__list">
                            <li className="accessibility__list-item">
                                Utilisation d’une structure HTML sémantique
                                (éléments main, header, nav, footer) pour
                                faciliter la navigation aux technologies
                                d’assistance.
                            </li>
                            <li className="accessibility__list-item">
                                Gestion du focus clavier pour permettre la
                                navigation sans souris.
                            </li>
                            <li className="accessibility__list-item">
                                Labels explicites et attributs ARIA adaptés
                                (aria-label, aria-labelledby, aria-describedby)
                                pour les éléments interactifs.
                            </li>
                            <li className="accessibility__list-item">
                                Contraste suffisant entre texte et arrière-plan
                                pour les malvoyants.
                            </li>
                            <li className="accessibility__list-item">
                                Utilisation modérée des animations ou effets
                                visuels pouvant perturber certaines personnes.
                            </li>
                            <li className="accessibility__list-item">
                                Composants de navigation utilisant des éléments
                                (nav et a) avec des rôles ARIA lorsque c’est
                                nécessaire.
                            </li>
                            <li className="accessibility__list-item">
                                Gestion du focus dynamique avec refs et hooks
                                React, par exemple pour placer le focus dans une
                                modale ouverte.
                            </li>
                            <li className="accessibility__list-item">
                                Annoncer les changements dynamiques avec des
                                régions ARIA live via des composants comme
                                react-aria-live.
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="accessibility__section accessibility">
                    <h2 className="accessibility__subtitle">
                        Tester et valider l'accessibilité
                    </h2>
                    <p className="accessibility__text">
                        Nous utilisons des outils comme Lighthouse, ou les
                        extensions d’inspection d’accessibilité des navigateurs
                        pour identifier et corriger les problématiques
                        d’accessibilité.
                    </p>
                    <p className="accessibility__text">
                        Des tests avec des lecteurs d’écran sont également
                        effectués pour valider la qualité de l’expérience
                        utilisateur pour tous.
                    </p>
                </section>

                <section className="accessibility__section accessibility">
                    <h2 className="accessibility__subtitle">Contact</h2>
                    <p className="accessibility__text">
                        N’hésitez pas à nous contacter pour signaler tout
                        problème d’accessibilité ou pour toute question relative
                        à l’accessibilité du site au lien suivant :{" "}
                        <Link className="accessibility__link" to="/contact">
                            Nous contacter
                        </Link>
                    </p>
                </section>
            </main>
        </div>
    );
}

export default Accessibility;