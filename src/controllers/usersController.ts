import { User } from "../models/userModel";

const db = require('../config/database');

async function getUsers(): Promise<Array<User>> {
    const result = await db.query('SELECT id, firstname, lastname, email, password FROM users');
    const userList: Array<User> = result.rows;
    return userList;
}

async function getUser(userId: string): Promise<User> {
    const result = await db.query('SELECT id, firstname, lastname, email, password FROM users where id = $1', [userId]);
    const user = result.rows.shift();
    return user;
}

export {
    getUser, getUsers
};

async function main() {
    try {
        const users = await getUsers();
        console.log(users);
        const user = await getUser('37b2e06a-33c1-431d-8e98-4d7df8c7a1e7');
        console.log(user);
    } catch (err) {
        console.error(err);
    }
}

if (require.main === module) {
    main();
}