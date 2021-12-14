export interface Role {
       id: number;
       value: string;
}
export interface IUser {
    id?: number;
    name?: string;
    status?: boolean;
    role_id?: Role;
}

export class User implements IUser {
    constructor(
        public id?: number,
        public name?: string,
        public status?: boolean,
        public role_id?: Role,
    ) {}
}
