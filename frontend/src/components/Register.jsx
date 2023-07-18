import { useState } from "react";
import AuthForm from "./AuthForm";

function Register({ handleRegister }) {

    const [formValue, setFormValue] = useState({ email: "", password: "" })

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!formValue.email || !formValue.password) {
            return;
        }

        handleRegister(formValue);
    }

    return (
        <AuthForm title="Регистрация" textButton="Зарегистрироваться" handleSubmit={handleSubmit} handleChange={handleChange}
            formValue={formValue} />

    );
}

export default Register;