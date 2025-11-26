import axios from "axios";
import { configure } from "axios-hooks";
import { refreshToken } from "./apiUser.js"; // fonction pour renouveler le token
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Adresse de base de notre API
const API_URL = import.meta.env.VITE_API_URL;

const api_axios = axios.create({
    baseURL: API_URL, // URL de base pour toutes les requêtes
    withCredentials: true, // inclut les cookies automatiquement dans les requêtes
});

// Important : on configure axios-hooks pour qu'il utilise notre instance
configure({ axios: api_axios });

// indique si un refresh est déjà en cours
// pour éviter de lancer plusieurs refresh simultanés
let refreshPromise = null; // Promise du refresh en cours

// --------------------------
// Hook React pour installer l'interceptor
// --------------------------
export const useAxiosInterceptor = () => {
    const navigate = useNavigate();
    const location = useLocation();

useEffect(() => {
    //  si la route actuelle est "/" ou "/compositions" ou /contact /legales /cgu /accessibility,
    // on reste / ré-affiche cette route,
    // sinon on redirige vers /login
    const redirectLoginOrKeep = () => {
        const path = location?.pathname || "/";
        const validPaths = [
            "/",
            "/compositions",
            "/contact",
            "/legales",
            "/cgu",
            "/accessibility",
        ];
        if (validPaths.includes(path)) {
            // replace pour éviter d'empiler l'historique inutilement
            navigate(path, { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    };


        // --------------------------
        // Interceptor de réponse
        // --------------------------
        const interceptor = api_axios.interceptors.response.use(
            (response) => response, // si tout va bien, on renvoie la réponse telle quelle
            async (error) => {
                // si une erreur survient (ex: 401, 403)
                const originalRequest = error?.config; // récupération de la config de la requête qui a échoué

                // --------------------------
                // Cas spécial : pas de réponse du tout (ex: cookies supprimés)
                // --------------------------
                if (!error.response) {
                    console.warn(
                        "Pas de réponse serveur (cookies supprimés ?)"
                    );
                    redirectLoginOrKeep();
                    return Promise.reject(error); // rejette la promesse pour signaler l'erreur
                }

                const status = error.response.status; // code HTTP (ex: 401, 403)

                // --------------------------
                // On ignore la requête de refresh elle‑même pour éviter boucle infinie
                // --------------------------
                if (originalRequest?.url?.includes("/user/refresh")) {
                    console.warn("Erreur sur le refresh, redirection login");
                    redirectLoginOrKeep();
                    return Promise.reject(error);
                }

                // --------------------------
                // Cas 401 / 403 : token expiré
                // --------------------------
                // si on est sur la page accueil ou compositions,
                // useLocation react-router
                if ([401, 403].includes(status) && !originalRequest._retry) {
                    originalRequest._retry = true; // marque la requête comme déjà retry

                    // Si aucun refresh en cours → on le lance
                    if (!refreshPromise) {
                        refreshPromise = refreshToken().finally(() => {
                            refreshPromise = null; // reset après le refresh
                        });
                    }

                    try {
                        // On attend le refresh en cours ou le nouveau
                        await refreshPromise;

                        // Une fois le token renouvelé, on relance la requête originale
                        return api_axios(originalRequest);
                    } catch (refreshError) {
                        console.error(
                            "Refresh token invalide ou expiré",
                            refreshError
                        );
                        redirectLoginOrKeep(); // redirection conditionnelle
                        return Promise.reject(refreshError);
                    }
                }

                // --------------------------
                // Dernier filet de sécurité : autres 401/403 non gérés
                // --------------------------
                if ([401, 403].includes(status)) {
                    console.warn("Non authentifié, redirection login");
                    redirectLoginOrKeep();
                }

                // Si erreur autre que 401/403, on laisse passer l'erreur
                return Promise.reject(error);
            }
        );

        // Nettoyage de l'interceptor quand le composant est démonté
        return () => {
            api_axios.interceptors.response.eject(interceptor);
        };
    }, [navigate, location]);

    // On renvoie l'instance pour l'utiliser dans le reste de l'application
    return api_axios;
};

export default api_axios;