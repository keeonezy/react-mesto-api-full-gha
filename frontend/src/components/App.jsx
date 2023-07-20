import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import auth from "../utils/authApi";
import Login from "./Login";
import Register from "./Register";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { ImagePopup } from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cards, user]) => {
          setCards(cards);
          setCurrentUser(user.data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }, [loggedIn]);

  // Проверка токена для авторизации
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            api.setToken(jwt);
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }, []);

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Выйти с аккаунта
  function handleSignOut() {
    api.setToken(null);
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  // Для логина
  function handleLogin({ email, password }) {
    auth.signIn(email, password)
      .then((data) => {
        if (data.token) {
          api.setToken(data.token)
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltipPopupOpen(true)
      })
  }

  function onSuccess(isSuccess) {
    setIsSuccess(isSuccess);
  }

  // Для регистрации
  function handleRegister({ email, password }) {
    auth.signUp(email, password)
      .then(() => {
        onSuccess(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        onSuccess(false);
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true)
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.setlike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateProfile(data) {
    api.editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddCard(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header email={email} onSignOut={handleSignOut} />
          <Routes>
            <Route path="/" element={
              <ProtectedRouteElement
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onCardDelete={handleDeleteCard}
                onCardLike={handleCardLike}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
              />}
            />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} setEmail={setEmail} />} />
            <Route path="/sign-up" element={<Register handleRegister={handleRegister} onSuccess={onSuccess} />} />
          </Routes>
          <Footer />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateProfile} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddCard} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoToolTip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={isSuccess} />

        </div>

      </div >
    </CurrentUserContext.Provider>
  );
}

export { App };