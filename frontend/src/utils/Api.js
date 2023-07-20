class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._token = null;
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

    setToken(token) {
        this._token = token;
    };

    getAppinfo() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }

    // Получение информации о пользователе с API
    getUserInfo() {

        return this._request(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        })
    }

    //загрузка карточек
    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${this._token}`,
              },
        })
    }

    // Редактирование профиля имя и обо мне
    editUserInfo(data) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name: data.name,
                about: data.post
            })
        })
    }

    // Редактируем аватар пользователя
    editUserAvatar(data) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }

    // Добавляем новую карточку
    addNewCard(data) {
        return this._request(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    // Удаляем карточку
    deleteCard(id) {
        return this._request(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
              },
        })
    }

    // Ставим лайк
    setlike(id) {
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
              },
        })
    }

    // Убираем лайк
    deleteLike(id) {
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json',
              },
        })
    }

}

// Данные для получения доступа к API предоставленный практикумом
const api = new Api({
    baseUrl: "https://b-keeonenew.nomoredomains.xyz",
    // baseUrl: "http://localhost:3001",
    headers: {
        // authorization: "2b912826-2e01-41bd-a2c8-a9cb197269a0",
        "Content-Type": "application/json"
    }
});

export { api };