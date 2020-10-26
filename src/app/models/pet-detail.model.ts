import {MedicalCondition} from './medical-condition.model';

export class PetDetail {
    id: number;
    pet_id: number;
    codition_id: number;
    observations: string;
    state: boolean;
    medical_condition: MedicalCondition;
    created_at: Date;
    updated_at: Date;
}
