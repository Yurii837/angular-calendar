import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SceduleItem } from '../../assets/scedule.class';
import { SceduleListService } from '../scedule-list/scedule-list.service';
import { ColorType } from '../../assets/type.enum';
import { CommonModule } from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-event',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule
    ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {

  private formConfig = {
    ...new SceduleItem(),
    ...this.data,
  }

  public ColorTypes = Object.keys(ColorType) as Array<keyof typeof ColorType>
  public ColorType = ColorType
  public JSON = JSON;

  public eventForm = this.fb.group({
    ...this.formConfig,
    name: [this.formConfig.name, [Validators.required, Validators.maxLength(24)]],
  })

  constructor(
    private sceduleListService: SceduleListService,
    public dialogRef: MatDialogRef<AddEventComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SceduleItem,
  ) {}

  formSubmit() {
    const actionFunction = this.data.name 
      ? this.sceduleListService.editEvent.bind(this.sceduleListService)
      : this.sceduleListService.pushEvent.bind(this.sceduleListService)
    actionFunction(this.eventForm.value)
      .then(res => {
        console.log(this.sceduleListService.SceduleList)
        this.dialogRef.close(res)
      })
  }
}
