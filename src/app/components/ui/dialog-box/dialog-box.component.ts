import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IProduct } from '../../../models/i-product';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule
  ],
})
export class DialogBoxComponent{

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? null),
    price: new FormControl(this.data?.price ?? null),
    year: new FormControl(this.data?.year ?? null),
    chip: new FormControl(this.data?.configuration.chip ?? null),
    ssd: new FormControl(this.data?.configuration.ssd ?? null),
    memory: new FormControl(this.data?.configuration.memory ?? null),
    display: new FormControl(this.data?.configuration.display ?? null),
  });

  productToEdit!: IProduct;

  isNewProduct: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
      if (this.data)
        this.isNewProduct = false;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.myForm);

    this.productToEdit = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: 'assets/images/macbook.png',
      configuration: {
        chip: this.myForm.value.chip,
        ssd: this.myForm.value.ssd,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      }
    };

    this.dialogRef.close(this.productToEdit);
  }
}

