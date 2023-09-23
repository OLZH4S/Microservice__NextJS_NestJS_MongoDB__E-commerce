export class User {
    constructor(
        readonly _id: string,
        readonly username: string,
        readonly password: string,
        readonly role: string,
        readonly address?: string,

    ) { }
}