import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updatePreview, deletePreview } from "../../api/apiPreview.js";
import Modal from 'react-bootstrap/Modal';
import { notify } from "../Toast/Toast.jsx";
import { XLg } from "react-bootstrap-icons";


function UpdatePreviewForm({ setSelectedPreview, setActiveItem, id, genreList = [], preview, onSaved = () => {} }) {

    // un seul state pour tout le formulaire (genres stocke les ids)
    const [formData, setFormData] = useState(() => ({
        title: preview?.title || "",
        isStar: preview?.isStar ?? false,
        date: preview?.date ? new Date(preview.date).toISOString().slice(0,10) : "",
        // on transduit listGenres (objets) en tableau d'ids 
        // afin de faciliter la gestion des checkbox
        genres: preview?.listGenres ? preview.listGenres.map(g => g.id) : []
    }));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // il faut recevoir les infos de la preview
    function toggleGenre(genreId) {
        setFormData(prev => {
            // on regarde si genreId est déjà dans la liste
            const has = prev.genres.includes(genreId);
            // on ajoute ou enlève selon le cas
            // on reprend l'ancien tableau pour ne pas perdre les autres genres
            // et en fonction de la présence on filtre ou on ajoute
            return { ...prev, genres: has ? prev.genres.filter(id => id !== genreId) : [...prev.genres, genreId] };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const payload = {
            title: formData.title,
            date: formData.date || null,
            isStar: formData.isStar,
            genres: formData.genres.length ? formData.genres.join(',') : ""
        };

        try {
            await updatePreview(id, payload); 
            onSaved();
            notify("Extrait modifié avec succès !", "success");
        } catch (err) {
            console.error("Erreur mise à jour preview:", err);
            setError("Échec de la mise à jour.");
            notify("Erreur lors de la modification de l'extrait", "error");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            await deletePreview(id);
            onSaved();
            notify("Extrait supprimé avec succès !", "success");
        } catch (err) {
            console.error("Erreur lors de la suppression de l'extrait : ", err);
            setError("Échec de la suppression.");
            notify("Erreur lors de la suppression de l'extrait", "error");
        } finally {
            setSaving(false);
        }

    }

    // synchronise formData si la prop preview change
    useEffect(() => {
        if (!preview) return;
        setFormData({
            title: preview.title || "",
            isStar: preview.isStar ?? false,
            date: preview.date ? new Date(preview.date).toISOString().slice(0,10) : "",
            genres: preview.listGenres ? preview.listGenres.map(g => g.id) : []
        });
    }, [preview]);

    if (!preview) return null;

    return (

        <>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit} id='updatePreview' method='patch' aria-labelledby="update-preview-title">
                <div className="preview__form__header">
                    <h2 className="preview__forms__title" id="update-preview-title">Modifier l'extrait</h2>
                    <Button aria-label="Fermer le formulaire" onClick={() => {setSelectedPreview(null); setActiveItem(null)}} className="preview__close__icon"><XLg aria-hidden='true' size={20}/></Button>
                </div>
                <p className="form__mandatory">Les champs marqués d'un (*) sont obligatoires.</p>
                <Form.Group className="mb-3 form__group">
                    <Form.Label className='form__label' htmlFor='previewTitle'>Titre de l'extrait *</Form.Label>
                    <Form.Control aria-required='true' required className='form__input' value={formData.title} onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))} id='previewTitle' name='title' type="text" placeholder="Entrer le titre" />
                </Form.Group>
                <Form.Group className="mb-3 form__group">
                    <Form.Label className='form__label' htmlFor='previewDate'>Date de l'extrait</Form.Label>
                    <Form.Control className='form__input' value={formData.date} onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))} id='previewDate' name='date' type="date"/>
                </Form.Group>
                <Form.Group className="form__group">
                    <Form.Label className='form__label' htmlFor='star-switch'>Voulez-vous rendre cet extrait accessible sur la page d'accueil ?</Form.Label>
                    <Form.Check className='form__input'
                        checked={formData.isStar}
                        onChange={(e) => setFormData(prev => ({...prev, isStar: e.target.checked}))}
                        name='isStar'
                        type="switch"
                        id="star-switch"
                        aria-label="Afficher cet extrait sur la page d'accueil"
                        label="Rendre l'extrait star"
                    />
                </Form.Group>
                <Form.Group aria-labelledby="update-preview-label" className="mb-3 form__group">
                    <Form.Label id="update-preview-label" className='form__label' htmlFor='genre'>Ajoute un ou plusieurs genres</Form.Label>
                    {genreList.length > 0 && genreList.map((genre) => (
                        <Form.Check key={genre.id}
                            className='checkBox form__input'
                            inline
                            label={genre.label}
                            name={genre.label}
                            type="checkbox"
                            id={`genre-${genre.id}`}
                            checked={formData.genres.includes(genre.id)}
                            onChange={() => toggleGenre(genre.id)}
                        />
                    ))}
                </Form.Group>
                <div className="d-flex form__button__container">
                    <Button className="preview__form__button" type="submit" disabled={saving}>
                        {saving ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </div>
                <div className="d-flex form__button__container">
                    <Button onClick={(e) => { e.preventDefault(); handleShow()}} disabled={saving} className="preview__form__button preview__form__button--delete">
                    {saving ? "Suppression..." : "Supprimer l'extrait"}
                    </Button>
                </div>
                <Modal show={show} onHide={handleClose} aria-labelledby='modal-update-preview-title' aria-describedby='modal-update-preview-desc'>
                    <Modal.Header closeButton>
                    <Modal.Title id="modal-update-preview-title">Supprimer l'extrait</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="modal-update-preview-desc">Etes-vous sûr de vouloir supprimer l'extrait "{preview.title}" ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={(e) => {e.preventDefault(); handleDelete(e); handleClose()}}>
                        Supprimer l'extrait
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </>
    
    )


}

export default UpdatePreviewForm;