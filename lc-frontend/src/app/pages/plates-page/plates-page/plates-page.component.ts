import { Component } from '@angular/core';
import { Product } from '../../../interfaces/Product';
import { ProductService } from '../../../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plates-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './plates-page.component.html',
  styleUrl: './plates-page.component.css',
})
export class PlatesPageComponent {
  plates: Product[] = [];
  selectedPlate: Product | null = null;
  showOrderFormPart2: boolean = false;
  orderDetails: any = {
    gramaj: 0.5,
    cantitate: 1,
    sugestii: '',
    deliveryMethod: 'livrare',
    nume: '',
    email: '',
    telefon: '',
    adresa: '',
    oras: '',
    codPostal: '',
    data: '',
  };
  private baseUrl: string = 'http://localhost:8080/uploads';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPlates();
  }

  fetchPlates(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.plates = data.filter((product) => product.type === 'Platou');
      },
      (error) => {
        console.error('Error fetching plates', error);
      }
    );
  }
  getImageUrl(imageName: string): string {
    return `${this.baseUrl}/${imageName}`;
  }

  orderPlate(plate: Product): void {
    this.router.navigate(['/order', plate.id]); // Navigate to the new route
  }
}
