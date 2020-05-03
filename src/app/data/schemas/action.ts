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
}
