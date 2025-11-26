import "./Preview.scss";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Preview({ title, audiosrc, genres }) {
    const [audioElement, setAudioElement] = useState();
    const [playIsHidden, setPlayIsHidden] = useState(false);
    const [pauseIsHidden, setPauseIsHidden] = useState(true);

    const URL = import.meta.env.VITE_BACK_URL;

    function toggleHidden() {
        setPlayIsHidden(!playIsHidden);
        setPauseIsHidden(!pauseIsHidden);
    }

    async function handlePlay() {
        await audioElement.play();
        toggleHidden();
    }

    async function handlePause() {
        await audioElement.pause();
        toggleHidden();
    }

    useEffect(() => {
        setAudioElement(new Audio(URL + audiosrc));
    }, []);

    return (
        <>
            <article className="preview">
                <div className="preview__container">
                    <figure className="preview__figure">
                        <figcaption className="preview__title">
                            {title}
                        </figcaption>
                        <audio className="audio">
                            <source
                                src={`${URL}${audiosrc}`}
                                type="audio/mpeg"
                            />
                        </audio>
                    </figure>
                    <div className="buttons">
                        <div
                            className={
                                playIsHidden
                                    ? "button button__play hidden"
                                    : "button button__play"
                            }
                            onClick={handlePlay}
                            id="play"
                        >
                            <i className="icon bi bi-play fs-1"></i>
                        </div>
                        <div
                            className={
                                pauseIsHidden
                                    ? "button button__pause hidden"
                                    : "button button__pause"
                            }
                            onClick={handlePause}
                            id="pause"
                        >
                            <i className="icon bi bi-pause fs-1"></i>
                        </div>
                    </div>
                </div>
                <div className="preview__genre__container">
                    {genres.length > 0 ? (
                        genres.map((genre) => (
                            <span key={genre.id} className="preview__genre">
                                {genre.label}
                            </span>
                        ))
                    ) : (
                        <p>Pas de genre</p>
                    )}
                </div>
            </article>
        </>
    );
}

export default Preview;
