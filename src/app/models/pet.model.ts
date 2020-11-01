import { Specie } from './specie.model';
import { User } from './user.model';

export class Pet {
    id: number;
    name: string;
    birthday: Date;
    photo: string;
    weight: number;
    height: number;
    state: boolean;
    species_id: number;
    owner_id: number;
    owner: User;
    species: Specie;
    created_at: Date;
    updated_at: Date;
}
