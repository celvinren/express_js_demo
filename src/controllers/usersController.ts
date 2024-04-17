import bcrypt from 'bcrypt';
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

async function getUserByEmail(email: string): Promise<User> {
    const result = await db.query('SELECT id, firstname, lastname, email, password FROM users where email = $1', [email]);
    const user = result.rows.shift();
    return user;
}

async function createUser(createUser: User): Promise<User> {
    const { firstName, lastName, email, password } = createUser;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    // Hash the password
    const hashedPassword = password != null ? await bcrypt.hash(password, 10) : null;
    const result = await db.query(
        'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [firstName, lastName, email, hashedPassword]
    );
    const user = result.rows.shift();
    return user;
}

export { createUser, getUser, getUserByEmail, getUsers };

async function main() {
    try {
        // const users = await getUsers();
        // console.log(users);
        // const user = await getUser('37b2e06a-33c1-431d-8e98-4d7df8c7a1e7');
        // console.log(user);
        // const userByEmail = await getUserByEmail('Calvin.Ren@example.com');
        // console.log(userByEmail);

        // const newUser: User = {
        //     firstName: 'Amy',
        //     lastName: 'Test',
        //     email: 'Amy.Test@ex.com',
        //     password: 'password'
        // };
        const createdUser = await createUser({
            firstName: 'Amy',
            lastName: 'Test',
            email: 'Amy.Test@ex.com',
            password: 'password'
        });
        console.log(createdUser);
    } catch (err) {
        console.error(err);
    }
}

if (require.main === module) {
    main();
}