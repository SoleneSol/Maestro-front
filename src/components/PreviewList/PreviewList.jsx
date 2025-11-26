import Preview from "../Preview/Preview.jsx";
import "./PreviewList.scss"
import { getAllPreviews, getAllGenres, filterByGenre, getAllStarPreviews } from "../../api/apiPreview.js";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext.jsx";
import Form from 'react-bootstrap/Form';
import PreviewForm from "../PreviewForm/PreviewForm.jsx";
import UpdatePreviewForm from "../UpdatePreviewForm/UpdatePreviewForm.jsx";
import Accordion from 'react-bootstrap/Accordion';
import { PlusSquareFill, DashSquareFill } from "react-bootstrap-icons";

function PreviewList({location}) {

    const [previewList, setPreviewList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [componentTitle, setComponentTitle] = useState('');
    const [previewForm, setPreviewForm] = useState('');
    const [isPlus, setIsPlus] = useState(true);

    // gestion Accordion
    const [activeItem, setActiveItem] = useState(null);
    const [selectedPreview, setSelectedPreview] = useState(null); // utilisé dans UpdatePreviewForm

    const {userIs} = useContext(UserContext)
    
    function handleOnSave() {
        getPreviewList();
    }

    function handleClose() {
        setPreviewForm('');
        setIsPlus(true);
    }

    async function getPreviewList() {
        if (location === '/compositions') {
            const allPreviewList = await getAllPreviews();
            setPreviewList(allPreviewList);
            setComponentTitle('Tous les extraits');
            getGenreList();
        } else {
            const allStarPreviews = await getAllStarPreviews();
            setPreviewList(allStarPreviews);
            setComponentTitle('Quelques extraits')
            getGenreList();
        }
    }

    async function getGenreList() {
        const allGenreList = await getAllGenres();
        setGenreList(allGenreList);
    }

    async function getPreviewByGenreFilter(genre) {
        const genreFiltered = await filterByGenre(genre);
        setPreviewList(genreFiltered);
    }

    function handleChange(e) {
        e.preventDefault();
        const genre = e.target.value;

        if (genre == "") {
            getPreviewList();
        } else {
            getPreviewByGenreFilter(genre);
        }
    }

    function handleAdd(e) {
        e.preventDefault();
        if (previewForm === '') {
            setPreviewForm(<PreviewForm close={handleClose} onSave={handleOnSave} genreList={genreList}/>)
        } else {
            setPreviewForm('');
        }
        setIsPlus(!isPlus);
    }

    function toggleItem(preview) {
        const key = String(preview.id);
        // bascule l'item actif et met à jour selectedPreview : si on reclique sur le même, on ferme et on supprime selectedPreview
        setActiveItem(prev => (prev === key ? null : key));
        setSelectedPreview(prev => (prev && prev.id === preview.id ? null : preview));
    }

    const handleSaved = () => {
        // ferme l'accordéon et rafraîchit la liste
        setActiveItem(null);
        setSelectedPreview(null);
        getPreviewList();
    }

    useEffect(() => {
        getPreviewList();
    }, [])

    return (
        <>
                {location == '/compositions' ? <h1 className="preview__list__title">{componentTitle}</h1> : <h2 className="preview__list__title">{componentTitle}</h2>}
                {location == '/compositions' && 
                <div className="preview__list__form__container">
                    <Form.Select size="lg" onChange={handleChange} className="genre__menu toggle-button" aria-label="Sort by genre">
                        
                        <option className="option-icon genre__item" value=''>Trier par genre</option>
                        {genreList.length != 0 && genreList.map((genre) => (
                            <option value={genre.label} key={genre.id} className="genre__item">{genre.label.charAt(0).toUpperCase() + genre.label.slice(1)}</option>
                        ))}
                    </Form.Select>
                </div>
                }

                <section className="preview__list">
                    {(previewList != null && previewList.length > 0) ? previewList.map((preview) => (
                        <div className="preview__item" key={preview.id}>
                        <Accordion
                            className="preview-card-accordion"
                            flush
                            activeKey={activeItem === String(preview.id) ? "0" : null}
                        >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div className="preview__item__header d-flex justify-content-between align-items-center w-100">
                                        <div className="preview__summary">
                                            <Preview audiosrc={preview.link} title={preview.title} genres={preview.listGenres}/>
                                        </div>
                                        <div className="preview__controls">
                                            {userIs === 'admin' &&
                                                <>
                                                    <span
                                                        role="button"
                                                        tabIndex={0}
                                                        className="collapse-button btn btn-link"
                                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleItem(preview); }}
                                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); toggleItem(preview); } }}
                                                        aria-label={activeItem === String(preview.id) ? `Fermer ${preview.title}` : `Ouvrir ${preview.title}`}
                                                    >
                                                        <i className={`fs-4 bi ${activeItem === String(preview.id) ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                                    </span>

                                                    <span
                                                        role="button"
                                                        tabIndex={0}
                                                        className="edit-button btn btn-link"
                                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleItem(preview); }}
                                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setActiveItem(String(preview.id)); setSelectedPreview(preview); } }}
                                                        aria-label={`Modifier ${preview.title}`}
                                                    >
                                                        <i className="pencil-icon fs-4 bi bi-pencil-square"></i>
                                                    </span>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {userIs === 'admin' &&
                                        <UpdatePreviewForm setSelectedPreview={setSelectedPreview} setActiveItem={setActiveItem} id={preview.id} preview={preview} genreList={genreList} onSaved={handleSaved} />
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                )) : <p>Pas d'extraits</p>}
                </section>
                {(userIs === 'admin' && location === '/compositions') &&
                <div>
                    <section className="admin__plus">
                        <button onClick={handleAdd} className="button__plus">
                            {isPlus === true ?                       
                                <PlusSquareFill size={40} className="plus__icon" />                                               
                            :
                                <DashSquareFill size={40} className="minus__icon" />
                            }
                        </button>
                    </section>
                    <section className="preview__form">
                        {previewForm}
                    </section>
                </div>
                }
        </>
    )

}

export default PreviewList;