import React from "react";
import { Link } from "react-router-dom";

function AuthForm({ title, textButton, handleChange, handleSubmit, formValue }) {
  return (
    <section className="auth">

      <h1 className="auth__title">{title}</h1>
      <form onSubmit={handleSubmit} className="auth_form">
        <input className="auth__input" id="email" name="email" type="email" value={formValue.email || ""} onChange={handleChange} placeholder="Email" required />
        <input className="auth__input" id="password" name="password" type="password" value={formValue.password || ""} onChange={handleChange} placeholder="Пароль" required />
        <div>
          <button type="submit" className="auth__button">{textButton}</button>
        </div>
        <Link to={title === "Регистрация" ? "/sign-in" : "/sign-up"} className="auth__desc-link">
          {title === "Регистрация" ? "Уже зарегистрированы? Войти" : ""}
        </Link>
      </form>

    </section>
  )
}

export default AuthForm;