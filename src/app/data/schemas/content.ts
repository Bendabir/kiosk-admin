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
}
