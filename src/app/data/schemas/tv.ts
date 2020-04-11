import { Content } from './content';
import { Group } from './group';

export class TV {
    id: string;
    displayName: string;
    description: string | null;
    active: boolean;
    on: boolean;
    screenSize: string | null;
    machine: string | null;
    ip: string | null;
    version: string | null;
    brightness: number;
    muted: boolean;
    volume: number;
    showTitle: boolean;
    createdAt: Date;
    updatedAt: Date;
    content: Content | string | null;
    group: Group | string | null;
}
