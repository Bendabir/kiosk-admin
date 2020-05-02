import { Content } from './content';
import { Group } from './group';

export class TV {
    static NO_CONTENT_PATH = 'assets/img/noise.jpeg';
    static NO_THUMBNAIL_PATH = 'assets/img/no_thumbnail.jpeg';

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

    private static toPercent(value: number): number {
        return Math.round(value * 100);
    }

    private static fromPercent(value: number): number {
        return value / 100;
    }

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

    /** Create a copy of the TV with content and group flatten to IDs.
     */
    flatten(): TV {
        const copy = Object.assign(new TV(), this);

        // Need to check on object and attribute in case the subobject
        // wasn't created from constructor
        if (this.group instanceof Object && this.group.id) {
            copy.group = this.group.id;
        }

        if (this.content instanceof Object && this.content.id) {
            copy.content = this.content.id;
        }

        return copy;
    }

    get volume100(): number {
        return TV.toPercent(this.volume);
    }

    set volume100(volume: number) {
        this.volume = TV.fromPercent(volume);
    }

    get brightness100(): number {
        return TV.toPercent(this.brightness);
    }

    set brightness100(brightness: number) {
        this.brightness = TV.fromPercent(brightness);
    }
}
