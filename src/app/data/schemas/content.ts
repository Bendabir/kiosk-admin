export enum ContentType {
    IMAGE = 'image',
    PLAYLIST = 'playlist',
    TEXT = 'text',
    VIDEO = 'video',
    WEBPAGE = 'webpage',
    YOUTUBE = 'youtube'
}

export class Content {
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
}
