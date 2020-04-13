export enum Theme {
    LIGHT = 'light',
    DARK = 'dark'
}

export enum Locale {
    fr_FR = 'fr-FR',
    en_US = 'en-US'
}

export class Settings {
    theme: Theme;
    locale: Locale;
    identifyDuration: number;
    forwardDuration: number;
    rewindDuration: number;
}
