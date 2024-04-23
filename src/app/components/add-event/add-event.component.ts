import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule,
     MatFormFieldModule,
      MatInputModule,
      MatSelectModule
    ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {

  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = null,
  ) { }
}
