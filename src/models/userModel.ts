class User {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;

    constructor(first_name: string, last_name: string, email: string, password?: string, id?: string) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.id = id;
    }

    compare(user: any): boolean {
        return this.id === user.id &&
            this.first_name === user.first_name &&
            this.last_name === user.last_name &&
            this.email === user.email;
    }
}

export { User };
