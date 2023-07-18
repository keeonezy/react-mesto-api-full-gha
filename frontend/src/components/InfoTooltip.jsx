import React from "react";
import successStatus from "../images/icon/successStatus.svg";
import errorStatus from "../images/icon/errorStatus.svg";

function InfoToolTip({ isOpen, onClose, isSuccess }) {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__group">
                <img
                    className="popup__infotooltip-icon"
                    src={isSuccess ? successStatus : errorStatus}
                    alt={isSuccess ? 'успешная регистрация' : errorStatus}
                />
                <p className="popup__infotooltip-desc">
                    {isSuccess
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
                <button type="button" className="popup__close-button" aria-label="закрыть" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoToolTip;