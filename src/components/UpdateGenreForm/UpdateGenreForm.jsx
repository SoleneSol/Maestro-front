import { useEffect, useState } from "react";
import { updateGenre } from "../../api/apiGenre.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { notify } from "../Toast/Toast.jsx";

function UpdateGenreForm({ genre, onSaved = () => {}, unshow = () => {} }) {
    const [formLabel, setFormLabel] = useState(genre.label);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);

        try {
            await updateGenre(genre.id, formLabel);
            onSaved();
            notify("Genre modifié avec succès", "success");
        } catch (err) {
            console.error("Erreur mise à jour genre:", err);
            setError("Échec de la mise à jour.");
            notify('Erreur lors de la modification du genre.', "error");
        } finally {
            setSaving(false);
            unshow();
        }
    }

    useEffect(() => {
        if (!genre) return;
        setFormLabel(genre.label);
    }, [genre]);

    return (
        <>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit} id="updateGenre" method="patch">
                <h2 className="form__title">Modifier le genre</h2>
                <Form.Group className="mb-3 form__group">
                    <Form.Label className="form__label" htmlFor="genreLabel">
                        Genre
                    </Form.Label>
                    <Form.Control
                        className="form__input"
                        value={formLabel}
                        onChange={(e) => setFormLabel(e.target.value)}
                        id="genreLabel"
                        name="label"
                        type="text"
                        placeholder="Entrer le genre"
                    />
                </Form.Group>
                <div className="d-flex form__button__container">
                    <Button
                        className="genre__form__button"
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default UpdateGenreForm;
