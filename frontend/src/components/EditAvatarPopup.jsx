import { useRef, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    return (
        <PopupWithForm title={"Обновить аватар"} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__section">
                <input ref={avatarRef} type="url" placeholder="Ссылка на картинку" name="avatarInput" className="popup__input popup__input_type_url" required />
                <span className="popup__error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;