'use strict';
const sqlite = require('sqlite3');
const db = new sqlite.Database("films.db", (err) => {
    if (err) {
        throw new Error(err);
    }
});

const crypto = require('crypto');

exports.getUser = (email, password) => {
    return new Promise ((resolve, reject) =>{
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, [email], (err, row)=>{
            if (err){
                return reject(err);
            }
            if (row === undefined){
                return resolve(false);
            }
            const user = {
                id : row.id,
                name : row.name,
                email : row.email
            }
            const salt = row.salt;
            crypto.scrypt(password, salt, 32, (err, hashedPassword)=>{
                if (err){
                    return reject(err);
                }
                if(!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword)){
                    return resolve(false);
                }
                resolve(user);
            })
        })
    })
}