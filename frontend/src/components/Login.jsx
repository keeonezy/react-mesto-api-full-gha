import { useState } from "react";
import AuthForm from "./AuthForm";

function Login({ handleLogin }) {

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

        handleLogin(formValue);
    }

    return (
        <AuthForm title="Вход" textButton="Войти" handleSubmit={handleSubmit} handleChange={handleChange} formValue={formValue} />
    );
}

export default Login;