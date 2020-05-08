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
  private _actions: BehaviorSubject<ActionItem[]>;

  constructor() {
    this._actions = new BehaviorSubject<ActionItem[]>([]);
  }

  get actions$(): Observable<ActionItem[]> {
    return this._actions.asObservable();
  }

  get actions(): ActionItem[] {
    return this._actions.value;
  }

  set actions(actions: ActionItem[]) {
    this._actions.next(actions);
  }
}
