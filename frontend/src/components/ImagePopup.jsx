import React from "react";

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image ${card.name ? "popup_opened" : ""}`}>
            <figure className="popup__images">
                <button type="button" className="popup__close-button" onClick={onClose} aria-label="Закрыть"></button>
                <img src={card.link} className="popup__image" alt={card.name} />
                <figcaption className="popup__figcaption">{card.name}</figcaption>
            </figure>
        </div>
    )
}

export { ImagePopup };