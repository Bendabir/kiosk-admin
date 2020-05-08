import { Settings } from '@app/models';

export enum ActionType {
    IDENTIFY = 'identify',
    RELOAD = 'reload',
    PLAY = 'play',
    PAUSE = 'pause',
    FORWARD = 'forward',
    REWIND = 'rewind',
    SHOW_SUBTITLES = 'show_subtitles'
}

interface DurationParameters {
    duration: number;
}

export type ActionParameters = DurationParameters | null;

export class Action {
    action: ActionType;
    parameters: ActionParameters;

    /** Infer parameters for an action given the app settings.
     */
    static parameters(action: ActionType, settings: Settings): ActionParameters {
        switch (action) {
            case ActionType.IDENTIFY: return {
                duration: settings.identifyDuration
            };
            case ActionType.FORWARD: return {
                duration: settings.forwardDuration
            };
            case ActionType.REWIND: return {
                duration: settings.rewindDuration
            };
            default: return null;
        }
    }

    static verb(action: ActionType): string {
        switch (action) {
            case ActionType.FORWARD: return 'forwarding';
            case ActionType.IDENTIFY: return 'identifying';
            case ActionType.PAUSE: return 'pausing';
            case ActionType.PLAY: return 'playing';
            case ActionType.RELOAD: return 'reloading';
            case ActionType.REWIND: return 'rewinding';
            default: return '';
        }
    }
}
