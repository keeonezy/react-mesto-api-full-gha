import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/icon/logo.svg"

function Header({ email, onSignOut }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleToggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className="header">
            <div className={`header__burger-user-info ${isMenuOpen ? "header__burger-user-info_opened" : ""}`}>
                <p className="header__email">{email}</p>
                <button className="header__button" onClick={onSignOut}>Выйти</button>
            </div>

            <div className="header_group">
                <img src={logo} alt="Логотип Место" className="header__logo" />

                <Routes>
                    <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
                    <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
                    <Route path="/" element={
                        <>
                            <div className="header__user-info">
                                <p className="header__email">{email}</p>
                                <button className="header__button" onClick={onSignOut}>Выйти</button>
                            </div>

                            <div className={`header__burger ${isMenuOpen ? "header__burger_opened" : ""}`} onClick={handleToggleMenu}></div>
                        </>
                    }
                    />
                </Routes>
            </div>
        </header>
    )
}

export { Header };