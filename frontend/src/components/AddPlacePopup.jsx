import { useState, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
    }

    useEffect(() => {
        setName("");
        setLink("");
    }, [props.isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    return (
        <PopupWithForm title={"Новое место"} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__section">
                <input type="text" placeholder="Название" name="name" minLength="2" maxLength="30" className="popup__input popup__input_type_name" value={name} onChange={handleChangeName} required />
                <span className="popup__error"></span>
            </div>
            <div className="popup__section">
                <input type="url" placeholder="Ссылка на картинку" name="link" className="popup__input popup__input_type_url" value={link} onChange={handleChangeLink} required />
                <span className="popup__error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;