import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  providers: [ProductService],
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.css',
})
export class AddProductModalComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;
  fileName: string | null = null;
  isEditMode: boolean = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number | null }
  ) {
    if (data && data.productId !== null) {
      this.isEditMode = true;
      this.productId = data.productId;
    }

    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      image: [''],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      type: ['', Validators.required],
    });


  }

  ngOnInit(): void {
    if (this.isEditMode && this.productId !== null) {
      this.productService
        .getProductById(this.productId)
        .subscribe((product) => {
          this.productForm.patchValue(product);
          this.fileName = product.image;
        });
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile?.name ?? null;
      this.productForm.get('image')?.setValue(this.fileName); // Update form control value
    } else {
      this.productForm.get('image')?.setValue(''); // Clear the form control value if no file is selected
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('title', this.productForm.get('title')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );
      formData.append(
        'ingredients',
        this.productForm.get('ingredients')?.value
      );
      formData.append('type', this.productForm.get('type')?.value);

      if (this.isEditMode && this.productId !== null) {
        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }
        this.productService.updateProduct(this.productId, formData).subscribe(
          (response) => {
            console.log('Product updated successfully', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating product', error);
          }
        );
      } else {
        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }
        this.productService.createProduct(formData).subscribe(
          (response) => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error creating product', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
