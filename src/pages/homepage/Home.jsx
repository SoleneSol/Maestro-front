import React, { useEffect, useState, useContext } from "react";
import Description from "../../components/Description/Description.jsx"
import DescriptionForm from "../../components/DescriptionForm/DescriptionForm.jsx";
import PreviewList from "../../components/PreviewList/PreviewList.jsx";
import { getAllDescription } from "../../api/apiDescription.js";
import UserContext from "../../UserContext.jsx";

const locationHome = "/";

function Home() {
    const [descriptions, setDescriptions] = useState([]);
    const { userIs } = useContext(UserContext);

    useEffect(() => {
        getAllDescription()
            .then((data) => setDescriptions(data))
            .catch((err) => console.error(err));
    }, []);

    function refreshDescriptions() {
        getAllDescription()
            .then((data) => setDescriptions(data))
            .catch((err) => console.error(err));
    }

    // Filtrage : séparation par "number"
    // const presentationCompositeur = descriptions.filter((d) => d.number === 1);
    // const prestation = descriptions.filter((d) => d.number === 2);

    let presentationCompositeur;
    let prestation;

    if (descriptions != null && descriptions.length > 0) {
        presentationCompositeur = descriptions.filter((d) => d.number === 1);
        prestation = descriptions.filter((d) => d.number === 2);
    }

    return (
        <>
            {/* Présentation du compositeur */}
            {presentationCompositeur != null && presentationCompositeur.length > 0 
            ? presentationCompositeur.map((description) => (
                <Description
                    key={description.id}
                    description={description}
                    onAction={refreshDescriptions}
                />
            ))
            : <h2>En cours de construction.</h2>}

            {/* Compositions stars */}
            <PreviewList location={locationHome} />

            {/* Prestation */}
            {prestation != null && prestation.length > 0 
            ? prestation.map((description) => (
                <Description
                    key={description.id}
                    description={description}
                    onAction={refreshDescriptions}
                />
            ))
            : <h2>En cours de construction.</h2>}

            {/* Formulaire d'administration */}
            {userIs === "admin" && (
                <section>
                    <DescriptionForm onAction={refreshDescriptions} />
                </section>
            )}
        </>
    );
}

export default Home;
