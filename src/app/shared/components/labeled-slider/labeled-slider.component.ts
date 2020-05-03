import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-labeled-slider',
  templateUrl: './labeled-slider.component.html',
  styleUrls: ['./labeled-slider.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LabeledSliderComponent), multi: true
  }]
})
export class LabeledSliderComponent implements ControlValueAccessor {
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() tickInterval: number;
  @Input() invert: boolean;

  // Apply a class on 'disabled' attr
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  @HostBinding('class.labeled-slider-disabled') private _disabled = false;

  @Input()
  get label(): string {
    return this._label;
  }
  set label(label: string) {
    if (!label) {
      label = '';
    }

    this._label = label;
  }
  private _label = '';

  @Input()
  get unit(): string {
    return this._unit;
  }
  set unit(unit: string) {
    if (!unit) {
      unit = '';
    }

    this._unit = unit;
  }
  private _unit = '';

  /**
   * Holds the current value of the slider
   */
  public value = 0;
  public sliderValue = 0; // Value of the slider when moving

  /** Simple approach that 'emulate' a reguler input/form component.
   */
  constructor() {}

  /**
   * Invoked when the model has been changed
   */
  private _onChange: (_: any) => void = (_: any) => {};

  /**
   * Invoked when the model has been touched
   */
  private _onTouched: () => void = () => {};

  /**
   * Method that is invoked on an update of a model.
   */
  updateChanges() {
      this._onChange(this.value);
  }

  /**
   * Writes a new item to the element.
   * @param value the value
   */
  writeValue(value: number): void {
    this.value = value;
    this.sliderValue = value;
    this.updateChanges();
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   */
  registerOnChange(fn: any): void {
      this._onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control receives a blur event.
   */
  registerOnTouched(fn: any): void {
      this._onTouched = fn;
  }

  /** Just to keep track of the slider value when changed.
   */
  onSliderChange(event: MatSliderChange) {
    this.sliderValue = event.value;
  }
}
