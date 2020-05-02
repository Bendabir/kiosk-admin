export class SplashButton {
    action: () => void;
    title: string;
}

export class Splash {
    icon: string;
    title: string;
    message: string;
    button: SplashButton | null;
}
