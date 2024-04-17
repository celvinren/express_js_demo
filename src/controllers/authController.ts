import bcrypt from 'bcrypt';
import { User } from '../models/userModel';
import { createUser, getUserByEmail } from './usersController';


async function signUp(user: User): Promise<User> {
    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    const newUser = await createUser(user);

    return newUser;
}

async function login(email: string, password: string): Promise<User> {
    const existingUser: User = await getUserByEmail(email);
    if (!existingUser) {
        throw new Error('User doesn\'t exist');
    }
    //TODO: Can check the signup method, if social login is allowed, then password can be null
    if (existingUser.password == null || password == null) {
        throw new Error('Password is null');
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
        throw new Error('Invalid credentials');
    }
    return existingUser;
}

export { login, signUp };

async function main() {
    try {
        // const signUpUser = await signUp({
        //     first_name: 'Amy1',
        //     last_name: 'Test1',
        //     email: 'Amy.Test1@ex.com',
        //     password: 'password'
        // });
        // console.log(signUpUser);

        const logInUser = await login(
            'Amy.Test1@ex.com',
            'password'
        );
        console.log(logInUser);
    } catch (err) {
        console.error(err);
    }
}

if (require.main === module) {
    main();
}