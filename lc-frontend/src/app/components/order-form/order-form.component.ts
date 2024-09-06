import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CalendarModule } from 'primeng/calendar';
import { OrderDetails } from '../../interfaces/OrderDetails';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent {
  selectedProduct: Product | null = null;
  showOrderFormPart2: boolean = false;
  orderForm: FormGroup;

  private baseUrl: string = 'http://localhost:8080/uploads'; // Adjust the base URL as needed

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      gramaj: [0.5, Validators.required],
      cantitate: [1, Validators.required],
      sugestii: [''],
      metodaLivrare: ['livrare', Validators.required],
      nume: ['', Validators.required],
      email: ['', [Validators.email]],
      telefon: ['', Validators.required],
      adresa: ['', Validators.required],
      oras: ['', Validators.required],
      codPostal: [''],
      data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const productId = params['productId'];
      this.fetchProduct(productId);
    });
  }

  fetchProduct(productId: string): void {
    const id = Number(productId); // Convert the productId to a number
    this.productService.getProductById(id).subscribe(
      (product: Product) => {
        this.selectedProduct = product;
      },
      (error: any) => {
        console.error('Error fetching product', error);
      }
    );
  }

  getImageUrl(imageName: string): string {
    return `${this.baseUrl}/${imageName}`;
  }

  goBack(): void {
    this.selectedProduct = null;
  }

  nextStep(): void {
    this.showOrderFormPart2 = true;
  }

  goBackToFirstForm(): void {
    this.showOrderFormPart2 = false;
  }

  submitOrder(): void {

    if (this.orderForm.invalid) {
      this.markAllAsTouched();
      console.error('Form is invalid');
      return;
    }

      const orderDetails: OrderDetails = this.orderForm.value;
      this.orderService.saveOrder(orderDetails).subscribe(
        response => {
          console.log('Order submitted successfully', response);
        },
        error => {
          console.error('Error submitting order', error);
        }
      );
  }

  private markAllAsTouched(): void {
    Object.keys(this.orderForm.controls).forEach(field => {
      const control = this.orderForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  
}

