import { Film } from "./filmLibrary";

const APIURL = 'http://localhost:3001/api/v1/films';
const LOGINURL = 'http://localhost:3001/api/v1'

async function getFilms() {
    const url = APIURL + '/';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            const list = await response.json();
            const filmsList = list.map((f) => new Film(f.id, f.title, f.favorite === 1, f.watchdate, f.rating));
            return filmsList;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    }
    catch (ex) {
        throw ex;
    }
}

async function getByIdFilm(id) {
    const url = APIURL + '/' + id;
    try {
        const response = await fetch(url, {
            credentials: 'include'
        })
        if (response.ok) {
            const f = await response.json();
            return new Film(f.id, f.title, f.favorite === 1, f.watchdate, f.rating);
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    }
    catch (ex) {
        throw ex;
    }
}

async function postFilm(film) {
    const url = APIURL + '/'
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "title": film.title,
                "favorite": film.favorite,
                "watchdate": film.dateOfWatching,
                "rating": film.rating,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}
async function putFilm(film) {
    const url = APIURL + '/' + film.id;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                "title": film.title,
                "favorite": film.favorite,
                "watchdate": film.dateOfWatching,
                "rating": film.rating,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

async function putFavoriteFilm(id) {
    const url = APIURL + '/' + id + '/favorite';
    try {
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

async function deleteFilm(id) {
    const url = APIURL + '/' + id;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

async function filteringFilms(filter) {
    const url = APIURL + '/filter/' + filter;
    try {
        const response = await fetch(url, {
            credentials: 'include'
        })
        if (response.ok) {
            const list = await response.json();
            const filmsList = list.map((f) => new Film(f.id, f.title, f.favorite === 1, f.watchdate, f.rating));
            return filmsList;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    }
    catch (ex) {
        throw ex;
    }
}

async function postLogin(username, password) {
    const url = LOGINURL + '/login'
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            return await response.json();
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

async function postLogout(username, password) {
    const url = LOGINURL + '/logout'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            return;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

const API = { getFilms, getByIdFilm, postFilm, putFilm, putFavoriteFilm, deleteFilm, filteringFilms, postLogin, postLogout};
export default API;