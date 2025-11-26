import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import "./GenreForm.scss";
import { addAGenre, getAllGenres, deleteGenre } from "../../api/apiGenre.js";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import UpdateGenreForm from "../UpdateGenreForm/UpdateGenreForm.jsx";
import { notify } from "../Toast/Toast.jsx";
import DOMPurify from "dompurify";

function GenreForm() {
    const [genreList, setGenreList] = useState([]);
    const [genreToAdd, setGenreToAdd] = useState("");
    const [saving, setSaving] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [idToUpdate, setIdToUpdate] = useState(null);
    const [updateGenre, setUpdateGenre] = useState("");
    const [genreToDelete, setGenreToDelete] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getListGenres() {
        const allGenreList = await getAllGenres();
        setGenreList(allGenreList);
    }

    function handleOnSaved() {
        getListGenres();
    }

    function unshowUpdate() {
        setIdToUpdate(null);
        setUpdateGenre("");
    }

    async function handleAddGenre() {
        setSaving(true);
        // test avec : TEST DOMPURIFY <a href="javascript:alert('XSS via javascript: URI')">clique-moi</a>
        const genreToAddPurified = DOMPurify.sanitize(genreToAdd);
        console.log('genre brut', genreToAdd)
        console.log('genre purifié', genreToAddPurified)
        try {
            await addAGenre(genreToAddPurified);
            handleOnSaved();
            notify("Genre créé avec succès", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout du genre' : ", error);
            notify("Erreur lors de l'ajout du genre", "error");
        } finally {
            setSaving(false);
        }
    }

    function showUpdate(genre) {
        setUpdateGenre(
            <UpdateGenreForm
                unshow={unshowUpdate}
                onSaved={handleOnSaved}
                genre={genre}
            />
        );
    }

    async function handleDelete(id) {
        handleOnSaved();
        console.log("id to delete : ", id);
        setSaving(true);
        try {
            console.log(id);
            await deleteGenre(id);
            handleOnSaved();
            notify("Le genre à bien été supprimé", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du genre : ", error);
            notify("Erreur lors de la suppression du genre", "error");
        } finally {
            setSaving(false);
            setGenreToDelete("");
        }
    }

    useEffect(() => {
        getListGenres();
    }, []);

    return (
        <>
            <section className="genre__container">
                <Accordion>
                    <Accordion.Item
                        className="genre__accordion__item"
                        eventKey="0"
                    >
                        <Accordion.Header
                            className="genre__accordion__title"
                        >
                            Liste des genres
                        </Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {genreList.length > 0 ? (
                                    genreList.map((genre) => (
                                        <div key={genre.id}>
                                            <Form
                                                className="genre__form__item"
                                                id={genre.id}
                                            >
                                                <ListGroup.Item>
                                                    <Form.Group className="genre__list__item genre__list__item--trash">
                                                        <Form.Label
                                                            htmlFor="genre"
                                                            id={genre.label}
                                                            className="genre__label"
                                                        >
                                                            {genre.label}
                                                        </Form.Label>
                                                        <div className="buttons__container">
                                                            <Button
                                                                id={genre.id}
                                                                name="genre"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setGenreToDelete(
                                                                        genre.label
                                                                    );
                                                                    setIdToDelete(
                                                                        genre.id
                                                                    );
                                                                    handleShow();
                                                                }}
                                                                className="trash__icon"
                                                            >
                                                                <Trash />
                                                            </Button>
                                                            <Button
                                                                id={genre.label}
                                                                name="genre"
                                                                className="pencil__icon"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setIdToUpdate(
                                                                        genre.id
                                                                    );
                                                                    showUpdate(
                                                                        genre
                                                                    );
                                                                }}
                                                            >
                                                                <PencilSquare />
                                                            </Button>
                                                        </div>
                                                    </Form.Group>
                                                </ListGroup.Item>
                                            </Form>
                                            {idToUpdate === genre.id &&
                                                updateGenre}
                                        </div>
                                    ))
                                ) : (
                                    <ListGroup.Item className="genre__list__item">
                                        Aucun genre trouvé
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Supprimer le genre</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Etes-vous sûr de vouloir supprimer le genre "
                            {genreToDelete}" ?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    handleClose();
                                    setGenreToDelete("");
                                }}
                            >
                                Annuler
                            </Button>
                            <Button
                                variant="primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(idToDelete);
                                    handleClose();
                                }}
                            >
                                Supprimer le genre
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Accordion.Item
                        className="genre__accordion__item"
                        eventKey="1"
                    >
                        <Accordion.Header
                            className="genre__accordion__title"
                        >
                            Ajouter un genre
                        </Accordion.Header>
                        <Accordion.Body>
                            <Form
                                className="genre__form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleAddGenre(e);
                                    setGenreToAdd("");
                                }}
                            >
                                <Form.Label htmlFor="genre">
                                    Ajout d'un genre
                                </Form.Label>
                                <Form.Control
                                    onChange={(e) =>
                                        setGenreToAdd(e.target.value)
                                    }
                                    value={genreToAdd}
                                    type="text"
                                    id="genre"
                                    name="genre"
                                    aria-describedby="Insert genre to add"
                                />
                                <div className="genre__button__container">
                                    <Button
                                        id="button__red"
                                        className="genre__form__button"
                                        type="submit"
                                    >
                                        {saving ? "Ajout..." : "Ajouter"}
                                    </Button>
                                </div>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </section>
        </>
    );
}

export default GenreForm;
