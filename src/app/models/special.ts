import { Time } from '@angular/common';

export class Special {
    id: number;
    doctor_id: number;
    day: Date;
    start_hour: Time;
    finish_hour: Time;
    state: boolean;
    created_at: Date;
    updated_at: Date;
}
