import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'fb-dialog-information',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './dialog-information.component.html',
  styleUrl: './dialog-information.component.scss'
})
export class DialogInformationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log('dialog module')
  }
}
