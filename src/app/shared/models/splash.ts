export class SplashButton {
    action: () => void;
    title: string;
}

export class Splash {
    icon: string;
    title: string;
    message: string;
    button: SplashButton | null;

    static errorSplash(message: string, button: SplashButton | null = null): Splash {
        return {
            icon: 'cloud_off',
            title: 'An error has occured',
            message: message || 'No further details...',
            button
        };
    }
}
