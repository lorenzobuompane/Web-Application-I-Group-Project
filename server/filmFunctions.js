const dayjs = require('dayjs');

/**
 * get favorite films
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
function getFavorites(vet) {
        const result = vet.filter(film => film.favorite);
        return result;
}

/**
 * get all films
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
function getAll(vet) {
        return [...vet];
}

/**
 * get unseen films
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
function getUnseen(vet) {
        const result = vet.filter((film) => !dayjs(film.watchdate).isValid());
        return result;
}

/**
 * get films with rating==5
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
function getFiveStars(vet) {
        const result = vet.filter(a => a.rating === 5);
        return result;
}

/**
 * get films viewed during the last 30 days
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
function getLastMonth(vet) {
        const result = vet.filter((film) => {
                if (dayjs(film.watchdate).isValid()) {
                        if (dayjs().diff(dayjs(film.watchdate), 'd') <= 30 && dayjs().diff(dayjs(film.watchdate), 'd') >= 0) {
                                return true;
                        }
                        else {
                                return false;
                        }
                } else {
                        return false;
                }
        });
        return result;
}

/**
 * return array with film added
 * @param {Array[Film]} vet 
 * @param {Film} newFilm 
 * @returns Array[Film]
 */
function addFilm(vet, newFilm) {
        return [...vet, newFilm];
}

/**
 * return array with film removed
 * @param {Array[Film]} vet 
 * @param {number} id 
 * @returns Array[Film]
 */
function removeFilm(vet, id) {
        return vet.filter((film) => film.id !== id);
}

/**
 * return array with film edited
 * @param {Array[Film]} vet 
 * @param {Film} newFilm 
 * @returns Array[Film]
 */
function editFilm(vet, filmToEdit) {
        return vet.map((film) => film.id === filmToEdit.id ? filmToEdit : film);
}

/**
 * get new id for new film
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
function getNewId(vet) {
        return vet[vet.length - 1].id + 1;
}

/**
 * return film with given id
 * @param {Array[Film]} vet 
 * @param {number} id 
 * @returns Array[Film]
 */
function getFilmById(vet, id) {
        return vet.filter((film) => film.id === id)[0];
}

module.exports = {
        getFavorites,
        getAll,
        getUnseen,
        getFiveStars,
        getLastMonth,
        addFilm,
        removeFilm,
        editFilm,
        getNewId,
        getFilmById
}