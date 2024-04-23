import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SceduleItem } from '../../clasess/scedule.class';
import { SceduleListService } from '../scedule-list/scedule-list.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule,
     MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatIconModule,
       ReactiveFormsModule
    ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent implements OnInit {

  constructor(
    private sceduleListService: SceduleListService,
    public dialogRef: MatDialogRef<AddEventComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SceduleItem,
  ) { }

  ngOnInit(): void {
    // this.eventForm.valueChanges
    //   .subscribe((val) => {
    //     console.log(val)
    //   })
  }

  // public eventForm = this.fb.group(new SceduleItem())
  public eventForm = this.fb.group({
    ...new SceduleItem(),
    ...this.data
  })

  formSubmit() {
    
    console.log(this.eventForm.value)
    this.sceduleListService.pushEvent(this.eventForm.value)
    console.log(this.sceduleListService.SceduleList)
  }


}
