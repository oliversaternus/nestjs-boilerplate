interface User {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface Post {
    text: string;
}

export const users: User[] = [
    {
        firstName: 'Joe',
        lastName: 'Shmoe',
        password: '12345678',
        username: 'joeshmoe',
        email: 'joe@shmoe.com'
    }
];