import pgPromise from "pg-promise";
import bcrypt from "bcrypt";
import db from '../config/db.js';

const User = {
    create: async( useremail, password) => {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        return db.none('INSERT INTO users(useremail, password) VALUES($1, $2)', [useremail, hashedPassword]); 
    },

    findByEmail: (useremail) => {
        return db.oneOrNone('SELECT * FROM users WHERE useremail = $1', [useremail]);
    }
};

export default User;