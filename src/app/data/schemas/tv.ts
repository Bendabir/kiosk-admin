import { Content } from './content';
import { Group } from './group';

export class TV {
    static NO_CONTENT_PATH = 'assets/img/no_content.png';
    static NO_THUMBNAIL_PATH = 'assets/img/no_thumbnail.png';

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

    /** Get a thumbnail for the current screen.
     */
    thumbnail(): string {
        if (this.content === null) {
            return TV.NO_CONTENT_PATH;
        } else if (typeof this.content === 'string') {
            return TV.NO_THUMBNAIL_PATH;
        } else if (this.content.thumbnail) {
            return this.content.thumbnail;
        } else {
            return TV.NO_THUMBNAIL_PATH;
        }
    }
}
