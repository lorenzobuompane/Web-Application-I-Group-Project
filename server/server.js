'use strict';

const express = require('express');

const cors = require('cors');

const films_dao = require('./films_dao');

const users_dao = require('./users_dao');

const funcF = require('./filmFunctions');

const PORT = 3001;

const app = new express();

const PREFIX = '/api/v1/films';
const LOGIN_PREFIX = '/api/v1';

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

app.use(cors(corsOptions));

const passport = require('passport');

const LocalStrategy = require('passport-local');

const crypto = require('crypto');

const session = require('express-session');

app.use(session({
    secret : 'GiacomoMarcoLorenzo',
    resave : false,
    saveUninitialized : false
}));

app.use(passport.authenticate('session'));

passport.serializeUser((user,cb)=>{
    cb(null, user);
});

passport.deserializeUser((user,cb)=>{
    return cb(null, user);
});

passport.use(new LocalStrategy(
    function verify(email, password, callback){
        users_dao.getUser(email, password)
        .then((user)=>{
            if(user){
                return callback(null, user);
            }
            return callback(false, {error: 'Username or password incorrect'});
        })
        .catch()
    }
));

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(400).json({message : "Not authenticated"});
}

app.get(PREFIX + '/', isLoggedIn, async (req, res) => {
    try {
        const filmsList = await films_dao.getFilms(req.user.id);
        return res.status(200).json(filmsList);
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.get(PREFIX + '/:id', isLoggedIn, async (req, res) => {
    try {
        let film = await films_dao.getFilmById(req.params.id, req.user.id);
        if (film === undefined) {
            return res.status(404).end();
        }
        return res.status(200).json(film);
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.get(PREFIX + '/filter/:filter', isLoggedIn ,async (req, res) => {
    try {
        let filteringFilms;
        const filmsList = await films_dao.getFilms(req.user.id);
        switch (req.params.filter) {
            case 'favorites':
                filteringFilms = funcF.getFavorites(filmsList);
                break;
            case 'bestRated':
                filteringFilms = funcF.getFiveStars(filmsList);
                break;
            case 'seenLastMonth':
                filteringFilms = funcF.getLastMonth(filmsList);
                break;
            case 'unseen':
                filteringFilms = funcF.getUnseen(filmsList);
                break;
            default:
                filteringFilms = funcF.getAll(filmsList);
                break;
        }
        return res.status(200).json(filteringFilms);
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.post(PREFIX + '/', isLoggedIn, async (req, res) => {
    const film = {
        "title": req.body.title,
        "favorite": req.body.favorite,
        "watchdate": req.body.watchdate,
        "rating": req.body.rating
    };

    try {
        await films_dao.postFilm(film, req.user.id);
        res.status(201).end();
    }
    catch (e) {
        console.log(e);
        res.status(503).end();
    }
});

app.put(PREFIX + '/:id', isLoggedIn ,async (req, res) => {
    try {
        const film = {
            "id" : req.params.id,
            "title": req.body.title,
            "favorite": req.body.favorite,
            "watchdate": req.body.watchdate,
            "rating": req.body.rating
        }

        let selectedFilm = await films_dao.getFilmById(req.params.id, req.user.id);
        if (selectedFilm === undefined) {
            return res.status(404).end();
        }

        await films_dao.putFilm(film, req.user.id);
        return res.status(200).end();
    }
    catch (e) {
        return res.status(500).send(e).end();
    }
});

app.put(PREFIX + '/:id/favorite', isLoggedIn ,async (req, res) => {

    try {
        let selectedFilm = await films_dao.getFilmById(req.params.id, req.user.id);
        if (selectedFilm === undefined) {
            return res.status(404).end();
        }
        await films_dao.putFilmFavorite(req.params.id, req.user.id);
        res.status(200).end();
    }
    catch (e) {
        console.log(e);
        res.status(503).end();
    }
});

app.delete(PREFIX + '/:id', isLoggedIn ,async (req, res) => {
    try{
        let selectedFilm = await films_dao.getFilmById(req.params.id, req.user.id);
        if (selectedFilm === undefined) {
            return res.status(404).end();
        }
        await films_dao.deleteFilmById(req.params.id, req.user.id);
        return res.status(204).end();
    } catch (e){
        return res.status(500).send(e);
    }
});

app.post(LOGIN_PREFIX + '/login', passport.authenticate('local'),(req,res)=>{
    res.status(200).json(req.user);
});

app.post(LOGIN_PREFIX + '/logout', isLoggedIn, (req, res)=>{
    req.logout(()=>{
        return res.status(200).end();
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));