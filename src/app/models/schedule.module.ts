import { Time } from '@angular/common';

export class Schedule {
    id: number;
    doctor_id: number;
    day: string;
    start_hour: Time;
    finish_hour: Time;
    state: boolean;
    created_at: Date;
    updated_at: Date;
}
