import { executeQuery } from "../database/database.js";

/**
 * service file handles interaction with the user table.
 */

/**
 * Adds a new user to the DB.
 * @param {*} email 
 * @param {*} password 
 */
const addUser = async (email, password) => {
    await executeQuery(
        `INSERT INTO users
            (email, password)
                VALUES ($1, $2);`,
        email,
        password,
    );
};

/**
 * Get user by email. 
 * Email is not primary key but is indexed.
 * @param {*} email
 * @returns user: id, email, password || Null. 
 */
const getUserByEmail = async (email) => {
    const result = await executeQuery(
        `SELECT * FROM users WHERE email = $1;`,
        email,
    );

    if(result.rows && result.rows.length > 0){
        return result.rows[0];
      }else{
        return null;
    }
};

export{
    addUser,
    getUserByEmail
};

