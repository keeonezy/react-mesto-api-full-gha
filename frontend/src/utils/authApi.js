class Auth {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    // Проверяем на ошибку
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    // Регистрация
    signUp(email, password) {
        return this._request(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
    };

    // Авторизация
    signIn(email, password) {
        return this._request(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
            .then((data) => {
                localStorage.getItem('jwt', data.token)
                return data;
            })
    };

    // Проверка токена
    getToken() {
        const token = localStorage.getItem('jwt');

        return this._request(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
    };
}

const auth = new Auth("http://localhost:3001");

export default auth;