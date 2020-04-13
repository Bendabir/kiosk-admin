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

    static localeName(locale: Locale): string {
        switch (locale) {
            case Locale.fr_FR: return 'French (FR)';
            case Locale.en_US: return 'English (US)';
            default: return locale;
        }
    }

    static themeClass(theme: Theme): string {
        // Defaults to light theme
        switch (theme) {
            case Theme.DARK: return 'kiosk-dark-theme';
            default: return 'kiosk-light-theme';
        }
    }
}
