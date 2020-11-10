import { Time } from '@angular/common';

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
}
