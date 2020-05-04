export enum Theme {
    LIGHT = 'light',
    DARK = 'dark'
}

export enum Locale {
    fr_FR = 'fr-FR',
    en_US = 'en-US'
}

export class Settings {
    static DEFAULT: Settings = {
        theme: Theme.LIGHT,
        locale: Locale.en_US,
        snacksEnabled: true,
        identifyDuration: 5000,
        forwardDuration: 5000,
        rewindDuration: 5000
    };

    theme: Theme;
    locale: Locale;
    snacksEnabled = true;
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
