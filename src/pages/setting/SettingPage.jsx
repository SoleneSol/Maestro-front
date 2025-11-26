import CompanyDataForm from "../../components/UserDataForm/Company/CompanyDataForm.jsx";
import UserDataForm from "../../components/UserDataForm/User/UserDataForm.jsx";
import { useState, useEffect, useContext } from "react";
import { getMyProfile } from "../../api/apiUser.js";
import UserContext from "../../UserContext.jsx";
import "./Setting.scss";

function SettingPage() {
    // Voir mes informations
    const [setting, setSetting] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { userIs } = useContext(UserContext);

    async function getMySetting() {
        const myProfile = await getMyProfile();
        setSetting(myProfile);
        setIsLoading(false);
    }

    useEffect(() => {
        getMySetting();
    }, []);

    // Afficher le formulaire de creation d'entreprise
    const [addCompany, setAddCompany] = useState(false);
    const [onUpdate, setOnUpdate] = useState(false);

    function companySettingsHandleClick(event) {
        event.preventDefault();
        setAddCompany(true);
    }

    return (
        <>
            <div className="settigs-item">
                {isLoading ? (
                    <p role="status">Chargement en cours...</p>
                ) : (
                    <div>
                        <UserDataForm />

                        {userIs === "client" && (
                            <>
                                {setting.user.company_id != null ? (
                                    // Update
                                    <CompanyDataForm onUpdate={true} />
                                ) : !addCompany ? (
                                    <div className="professionnel-div">
                                        <p id="company-question">
                                            Je suis un professionnel ?
                                        </p>
                                        <button
                                            className="addCompany-button"
                                            aria-describedby="company-question"
                                            onClick={companySettingsHandleClick}
                                        >
                                            Enregistrer les informations de mon
                                            entreprise
                                        </button>
                                    </div>
                                ) : (
                                    <CompanyDataForm
                                        onUpdate={onUpdate}
                                        onCompanyCreated={() =>
                                            setOnUpdate(true)
                                        }
                                    />
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default SettingPage;
