import { Time } from '@angular/common';
import { Pet } from './pet.model';
import { User } from './user.model';
import { AppointmentTypes } from './appointment-types.model'

export class Appointment {
    id: number;
    appointment_date: Date;
    appointment_start_hour: Time;
    status: string;
    observations: string;
    emergency: boolean;
    state: boolean;
    type_id: number;
    pet_id: number;
    doctor_id: number;
    created_at: Date;
    updated_at: Date;
    pet: Pet;
    type: AppointmentTypes;
    doctor: User;
}
