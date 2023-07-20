class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
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

    // Получение информации о пользователе с API
    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
    }

    //загрузка карточек
    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
    }

    // Редактирование профиля имя и обо мне
    editUserInfo(data) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
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
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }

    // Добавляем новую карточку
    addNewCard(data) {
        return this._request(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
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
            headers: this._headers
        })
    }

    // Ставим лайк
    setlike(id) {
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers
        })
    }

    // Убираем лайк
    deleteLike(id) {
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
    }

}

// Данные для получения доступа к API предоставленный практикумом
const api = new Api({
    baseUrl: "http://localhost:3001",
    headers: {
        // authorization: "2b912826-2e01-41bd-a2c8-a9cb197269a0",
        "Content-Type": "application/json"
    }
});

export { api };