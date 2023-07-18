import React from "react";

function PopupWithForm({ name, title, textButton, onClose, children, isOpen, onSubmit }) {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__group">
                <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
                <form className={`popup__form`} name={name} onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button type="submit" className="popup__button">{textButton || "Сохранить"}</button>
                </form>
            </div>
        </div>
    )
}

export { PopupWithForm };