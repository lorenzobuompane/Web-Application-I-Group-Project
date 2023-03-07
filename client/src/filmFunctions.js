import dayjs from 'dayjs';

/**
 * get favorite films
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
export function getFavorites(vet) {
        const result = vet.filter(film => film.favorite);
        return result;
}

/**
 * get all films
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
export function getAll(vet) {
        return [...vet];
}

/**
 * get unseen films
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
export function getUnseen(vet) {
        const result = vet.filter((film) => !film.dateOfWatching.isValid());
        return result;
}

/**
 * get films with rating==5
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
export function getFiveStars(vet) {
        const result = vet.filter(a => a.rating === 5);
        return result;
}

/**
 * get films viewed during the last 30 days
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
export function getLastMonth(vet) {
        const result = vet.filter((film) => {
                if (film.dateOfWatching.isValid()) {
                        if (dayjs().diff(film.dateOfWatching, 'd') <= 30 && dayjs().diff(film.dateOfWatching, 'd') >= 0) {
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
export function addFilm(vet, newFilm) {
        return [...vet, newFilm];
}

/**
 * return array with film removed
 * @param {Array[Film]} vet 
 * @param {number} id 
 * @returns Array[Film]
 */
export function removeFilm(vet, id) {
        return vet.filter((film) => film.id !== id);
}

/**
 * return array with film edited
 * @param {Array[Film]} vet 
 * @param {Film} newFilm 
 * @returns Array[Film]
 */
export function editFilm(vet, filmToEdit) {
        return vet.map((film) => film.id === filmToEdit.id ? filmToEdit : film);
}

/**
 * get new id for new film
 * @param {Array[Film]} vet 
 * @returns Array[Film]
 */
export function getNewId(vet) {
        return vet[vet.length - 1].id + 1;
}

/**
 * return film with given id
 * @param {Array[Film]} vet 
 * @param {number} id 
 * @returns Array[Film]
 */
export function getFilmById(vet, id) {
        return vet.filter((film) => film.id === id)[0];
}