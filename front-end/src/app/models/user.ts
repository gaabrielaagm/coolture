export class User{
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public pw: string,
        public role: string,
        public image: string,
        public del: boolean,
        public notify: boolean
    ) { }
}