import { Permission } from './permission';

export class User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    dui: string;
    address: string;
    phone: string;
    state: boolean;
    type_user_id: number;
    permission: Permission[];
    created_at: Date;
    updated_at: Date;
    token: string;
}
