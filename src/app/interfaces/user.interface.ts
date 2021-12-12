export interface Role {
       id: number;
       nombre: string;
}
export interface IUser {
    id?: number;
    nombre?: string;
    activo?: string;
    rol_id?: Role;
}

export class User implements IUser {
    constructor(
        public id?: number,
        public nombre?: string,
        public activo?: string,
        public rol_id?: Role,
    ) {}
}
