import { useContext } from "react";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onCardClick, onEditProfile, onAddPlace, onCardDelete, onCardLike, cards }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">

            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={currentUser.avatar} alt="Фотография пользователя" className="profile__avatar" />
                    <button className="profile__button-change" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__about">{currentUser.about}</p>
                    <button className="profile__button-edit" aria-label="Edit" type="button" onClick={onEditProfile}></button>
                </div>
                <button className="profile__button-add" aria-label="Add" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export { Main };