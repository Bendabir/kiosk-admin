import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export enum ActionElementType {
  BUTTON = 'button',
  DIVIDER = 'divider',
}

interface ActionBaseElement {
  type: ActionElementType;
}

export class ActionButton implements ActionBaseElement {
  type = ActionElementType.BUTTON;

  constructor(
    public icon: string,
    public tooltip: string,
    public action: () => void,
    public color: string | null = null,
    public disabled: boolean = false
  ) {}
}

export class ActionDivider implements ActionBaseElement {
  type = ActionElementType.DIVIDER;

  constructor() {}
}

export type ActionItem = ActionButton | ActionDivider;

@Injectable()
export class ActionsService {
  private _actions: BehaviorSubject<ActionItem[]> = new BehaviorSubject([]);
  private _enabled: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public readonly actions$: Observable<ActionItem[]> = this._actions.asObservable();
  public readonly actionsEnabled$: Observable<boolean> = this._enabled.asObservable();

  get actions(): ActionItem[] {
    return this._actions.value;
  }

  set actions(actions: ActionItem[]) {
    this._enabled.next(actions.length > 0);
    this._actions.next(actions);
  }

  get actionsEnabled(): boolean {
    return this._enabled.value;
  }

  disableActions() {
    this._enabled.next(false);
    this._actions.next([]);
  }
}
