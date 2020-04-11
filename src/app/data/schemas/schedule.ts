import { Content } from './content';
import { TV } from './tv';

export enum ScheduleOrigin {
    USER = 'user',
    PLAYLIST = 'playlist'
}

export class Schedule {
    id: number;
    playAt: Date;
    origin: ScheduleOrigin;
    recurrenceDelay: number | null;
    nbRecurrences: number;
    createdAt: Date;
    updatedAt: Date;
    content: Content | string;
    tv: TV | string;
}
