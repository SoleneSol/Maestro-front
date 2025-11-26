import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addPreview } from '../../api/apiPreview.js';
import './PreviewForm.scss'
import { notify } from "../Toast/Toast.jsx";

function PreviewForm({genreList, onSave = () => {}, close = () => {}}) {

    const [form, setForm] = useState();
    const [saving, setSaving] = useState(false);

    function initForm() {
        setForm(document.getElementById('addPreview'));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        const formCheckbox = event.target;
        const checkedBoxes = formCheckbox.querySelectorAll('.checkBox input[type="checkbox"]:checked');

        const formData = new FormData(form);
        const genres = [];
        checkedBoxes.forEach((checkbox) => {
            genres.push(parseInt(checkbox.id));
        });
        formData.append("genres", genres);

        try {
            await addPreview(formData);
            onSave();
            notify("Extrait ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'extrait : ", error);
            notify("Erreur lors de l'ajout de l'extrait.", "error");
        } finally {
            setSaving(false);
            close();
        }
    }

    useEffect(() => {
        initForm();
    }, []);

    return (
        <Form aria-labelledby='add-preview-title' className='addPreview__form' onSubmit={handleSubmit} id='addPreview' method='post' encType="multipart/form-data">
            <h2 id='add-preview-title' className="preview__forms__title">Ajouter un extrait</h2>
            <p className="form__mandatory">Les champs marqués d'un (*) sont obligatoires.</p>
            <div className='form__group__container'>
                <Form.Group className="form__group mb-3">
                    <Form.Label className='form__label' htmlFor='previewTitle'>Titre de l'extrait *</Form.Label>
                        <Form.Control aria-required='true' required className='form__input' id='previewTitle' name='title' type="text" placeholder="Entrer le titre" />
                </Form.Group>
                <Form.Group className="form__group mb-3">
                    <Form.Label className='form__label' htmlFor='previewDate'>Date de l'extrait *</Form.Label>
                    <Form.Control required className='form__input' id='previewDate' name='date' type="date"/>
                </Form.Group>
                <Form.Group className='form__group mb-3'>
                    <Form.Label className='form__label' htmlFor='star-switch'>Rendre l'extrait accessible sur l'accueil ?</Form.Label>
                    <Form.Check className='form__input'
                        name='isStar'
                        type="switch"
                        id="star-switch"
                        aria-label="Afficher cet extrait sur la page d'accueil"
                        label="Rendre l'extrait star"
                    />
                </Form.Group>
            </div>
            <div className='form__group__container form__group__container--file'>
                <Form.Group aria-labelledby='add-preview-genre-label' className="form__group mb-3">
                    <Form.Label id='add-preview-genre-label' className='form__label' htmlFor='genre'>Ajoute un ou plusieurs genres</Form.Label>
                    {genreList.length > 0 && genreList.map((genre) => (
                        <div key={genre.id}>
                        <Form.Check
                            className='checkBox'
                            inline
                            label={genre.label}
                            name={genre.label}
                            type="checkbox"
                            id={genre.id}
                        />
                        </div>
                    ))}
                </Form.Group>
                <Form.Group className="form__group mb-3">
                    <Form.Label className='form__label' htmlFor='previewFile'>Parcourir les fichiers</Form.Label>
                    <Form.Control aria-label='Sélectionner un fichier à importer' id='previewFile' name='previewFile' type="file" />
                </Form.Group>
            </div>
            <div className='form__button__container'><Button className='preview__form__button' type="submit">{saving ? "Ajout..." : "Ajouter"}</Button> </div>
        </Form>
    )

}

export default PreviewForm;