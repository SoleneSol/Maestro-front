import "./CompanyCard.scss";

function CompanyCard({ company }) {
    return (
        <section
            className="company-card"
            aria-labelledby="information-entreprise"
        >
            <div className="company-card-header">
                <h3 className="company-card-header-title">
                    Information d'entreprise
                </h3>
            </div>
            <div className="company-card_div company-card_email_div">
                <p className="company-card_item ">Nom</p>
                <p className="company-card_item-result">{company.name}</p>
            </div>
            <div className="company-card_div">
                <p className="company-card_item">Adresse</p>
                <p className="company-card_item-result">
                    {company.localisation}
                </p>
            </div>
            <div className="company-card_div">
                <p className="company-card_item">N° de Siret</p>
                <p className="company-card_item-result">{company.siret}</p>
            </div>
        </section>
    );
}

export default CompanyCard;
