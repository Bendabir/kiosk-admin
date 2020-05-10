export enum ContentType {
    IMAGE = 'image',
    PLAYLIST = 'playlist',
    TEXT = 'text',
    VIDEO = 'video',
    WEBPAGE = 'webpage',
    YOUTUBE = 'youtube'
}

export interface ContentIcon {
    name: string;
    isCustom: boolean;
}

export class Content {
    static ACTIVATED_TYPES: ContentType[] = Object.values(ContentType).filter(t => t !== ContentType.PLAYLIST);

    id: string;
    displayName: string;
    description: string | null;
    type: ContentType;
    uri: string | null;
    thumbnail: string | null;
    duration: number | null;
    mimeType: string | null;
    createdAt: Date;
    updatedAt: Date;

    static prettifyType(type: ContentType): string {
        switch (type) {
            case ContentType.IMAGE: return 'Image';
            case ContentType.PLAYLIST: return 'Playlist';
            case ContentType.TEXT: return 'Text';
            case ContentType.VIDEO: return 'Video';
            case ContentType.WEBPAGE: return 'Web Page';
            case ContentType.YOUTUBE: return 'YouTube';
            default: return 'Unknown';
        }
    }

    static icon(type: ContentType): ContentIcon {
        switch (type) {
            case ContentType.IMAGE: return {
                name: 'image',
                isCustom: false
            };
            case ContentType.PLAYLIST: return {
                name: 'playlist_play',
                isCustom: false
            };
            case ContentType.TEXT: return {
                name: 'notes',
                isCustom: false
            };
            case ContentType.VIDEO: return {
                name: 'movie',
                isCustom: false
            };
            case ContentType.WEBPAGE: return {
                name: 'web_asset',
                isCustom: false
            };
            case ContentType.YOUTUBE: return {
                name: 'youtube',
                isCustom: true
            };
        }
    }

    get icon(): ContentIcon {
        return Content.icon(this.type);
    }

    get prettifiedType(): string {
        return Content.prettifyType(this.type);
    }
}
