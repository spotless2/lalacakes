import { Component } from '@angular/core';
import { Product } from '../../../interfaces/Product';
import { ProductService } from '../../../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-plates-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './plates-page.component.html',
  styleUrl: './plates-page.component.css'
})
export class PlatesPageComponent {
  plates: Product[] = [];
  private baseUrl: string = 'http://localhost:8080/uploads'; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchPlates();
  }

  fetchPlates(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.plates = data.filter(product => product.type === 'Platou');
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
    console.log('Ordering plate:', plate);
    // Implement order functionality here
  }
}
