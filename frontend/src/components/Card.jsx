import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked && "card__like_active"}`
    );

    const handleClick = () => {
        onCardClick(card);
    }
    const handleDeleteClick = () => {
        onCardDelete(card);
    };
    const handleLikeClick = () => {
        onCardLike(card);
    };

    return (
        <li className="card">
            {isOwn && <button className="card__trash" aria-label="удалить" onClick={handleDeleteClick} />}
            <img src={card.link} alt={card.name} onClick={handleClick} className="card__image" />
            <div className="card__info">
                <h2 className="card__title">{card.name}</h2>

                <div className="card__like-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="card__like-number">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export { Card };