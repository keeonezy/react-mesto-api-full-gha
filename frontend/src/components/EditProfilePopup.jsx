import { useState, useEffect, useContext } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name,
            post: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm title={"Редактировать профиль"} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="info">
            <div className="popup__section">
                <input type="text" placeholder="Имя" name="name" minLength="2" maxLength="40" className="popup__input popup__input_type_name" onChange={handleChangeName} value={name || ""} required />
                <span className="popup__error"></span>
            </div>
            <div className="popup__section">
                <input type="text" placeholder="Вид деятельности" name="about" minLength="2" maxLength="200" className="popup__input popup__input_type_job" onChange={handleChangeDescription} value={description || ""} required />
                <span className="popup__error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;