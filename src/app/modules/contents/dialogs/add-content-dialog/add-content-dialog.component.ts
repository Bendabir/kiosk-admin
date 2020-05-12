import { Component } from '@angular/core';
import { MatDialogRef, MatStepper } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';

import { Content, ContentType } from '@data/schemas';
import { ContentsService,  } from '@data/services';

@Component({
  selector: 'app-add-content-dialog',
  templateUrl: './add-content-dialog.component.html',
  styleUrls: ['./add-content-dialog.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class AddContentDialogComponent {
  private static NB_STEPS = 2;

  public types: ContentType[] = Content.ACTIVATED_TYPES;
  public content: Content;
  public formCheckedByUser = false;

  constructor(
    private dialogRef: MatDialogRef<AddContentDialogComponent>,
    private contentsService: ContentsService
  ) {
    this.content = new Content();
  }

  analyse(uri: string) {
    this.contentsService.analyseURI(uri).subscribe({
      next: (content: Content) => {
        this.content = content;
      },
      error: _ => {}
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  prettifyType(type: ContentType): string {
    return Content.prettifyType(type);
  }

  isText(type: ContentType): boolean {
    return type === ContentType.TEXT;
  }

  hasPrevious(stepper: MatStepper) {
    return stepper.selectedIndex > 0;
  }

  hasNext(stepper: MatStepper) {
    return stepper.selectedIndex < AddContentDialogComponent.NB_STEPS - 1;
  }

  onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      this.formCheckedByUser = true;
    }
  }
}
