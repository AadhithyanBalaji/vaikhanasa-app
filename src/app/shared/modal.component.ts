import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-amrr-modal',
  template: `<div style="width: 30vw">
    <h2 mat-dialog-title>
      {{ title }}
    </h2>
    <div mat-dialog-content>
      {{ body }}
    </div>
    <div mat-dialog-actions>
      <div
        style="width: 100%;        display: flex;        justify-content: end;"
      >
        <button mat-flat-button color="primary" (click)="onActionOne()">
          {{ actionText1 }}
        </button>
        <button
          *ngIf="type == modalType.Confirmation"
          mat-flat-button
          color="secondary"
          (click)="onActionTwo()"
        >
          {{ actionText2 }}
        </button>
      </div>
    </div>
  </div>`,
})
export class ModalComponent {
  title: string;
  body: string;
  actionText1: string;
  actionText2: string;
  type: ModalType;

  modalType = ModalType;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalComponent
  ) {
    this.title = data.title;
    this.body = data.body;
    this.actionText1 = data.actionText1 ?? 'Yes';
    this.actionText2 = data.actionText2 ?? 'No';
    this.type = data.type ?? this.modalType.Confirmation;
  }

  onActionOne() {
    this.dialogRef.close(true);
  }

  onActionTwo() {
    this.dialogRef.close(false);
  }
}

export enum ModalType {
  Alert = 1,
  Confirmation = 2,
}
