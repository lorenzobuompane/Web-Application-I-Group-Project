'use strict';
const sqlite = require('sqlite3');
const db = new sqlite.Database("films.db", (err) => {
    if (err) {
        throw new Error(err);
    }
});

async function test() {
    return ({ "test": "test" });
}

async function getFilms(user) {
    const sql = "SELECT * FROM films WHERE user = ? ";
    return new Promise((resolve, reject) => {
        db.all(sql, user, (error, rows) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(rows);
            return;
        });
    });
}

async function getFilmById(id, user) {
    const sql = "SELECT * FROM films WHERE id = ? AND user=?";
    return new Promise((resolve, reject) => {
        db.all(sql, [id, user], (error, rows) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(rows[0]);
            return;
        });
    });
}

async function putFilm(film, user) {
    const sql = "UPDATE films SET title=?, favorite=?, watchdate=?, rating=? WHERE id=? AND user=?";
    return new Promise((resolve, reject) => {
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating, film.id, user], (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        });
    });
}

async function deleteFilmById(id, user){
    const sql = "DELETE FROM films WHERE id = ? AND user=?";
    return new Promise((resolve, reject)=>{
        db.run(sql, [id,user], (error)=>{
            if(error){
                reject(error);
                return;
            }
            resolve();
            return;
        });
    });
}

async function postFilm(film, user){
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO films( title, favorite, watchdate, rating, user) VALUES( ?, ?, ?, ?, ?)';
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating, user], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
            return;
        });
    });
}

async function putFilmFavorite(id, user){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET favorite = NOT favorite WHERE id = ? AND user=?';
        db.run(sql, [id, user], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
            return;
        });
    });
}


module.exports = {
    test,
    getFilms,
    postFilm,
    putFilmFavorite,
    deleteFilmById,
    putFilm,
    getFilmById,
};