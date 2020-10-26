export class Permission {
    id: number;
    registro: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    users_types_id: number;
    state: boolean;
    created_at: Date;
    updated_at: Date;
}
