import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';
// Apply custom style

interface Option {
  label: string;
  value: string;
  image: string;
}

@Component({
  selector: 'app-cakes-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    FormsModule,
    MultiSelectModule,
    CalendarModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cakes-page.component.html',
})
export class CakesPageComponent {
  options: Option[] = [
    {
      label: 'Ciocolată',
      value: 'Ciocolată',
      image: 'assets/img/cake-feature/c-feature-1.jpg',
    },
    {
      label: 'Vanilie',
      value: 'Vanilie',
      image: 'assets/img/cake-feature/c-feature-1.jpg',
    },
    {
      label: 'Fructe',
      value: 'Fructe',
      image: 'assets/img/cake-feature/c-feature-1.jpg',
    },
    {
      label: 'Crema de branza',
      value: 'Crema de branza',
      image: 'assets/img/cake-feature/c-feature-1.jpg',
    },
  ];

  cakeForm!: FormGroup;
  buyerForm!: FormGroup;
  selectedCakeInterior: Option | null = null;
  dropdownOpen = false;
  showCustomCakeSection: boolean = false;
  showCakeSelectionSection: boolean = false;
  selectedCakes: any[] = []; // Array to store selected options
  cakeCoverOptions: any[]; // Array to store the dropdown options
  selectedOption!: string;
  deliveryAddress!: string;
  deliveryCity!: string;
  step: number = 1;
  images: string[];
  showBuyerDetails = false;
  cakes: Product[] = [];
  private baseUrl: string = 'http://localhost:8080/uploads'; // Adjust the base URL as needed

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private router: Router
  ) {
    this.cakeCoverOptions = [
      { label: 'Fondant', value: 'Fondant' },
      { label: 'Frișcă', value: 'Frișcă' },
      { label: 'Ciocolată', value: 'Ciocolată' },
      { label: 'Marțipan', value: 'Marțipan' },
    ];
    this.images = [
      'assets/img/cake-feature/c-feature-1.jpg',
      'assets/img/cake-feature/c-feature-2.jpg',
      'assets/img/cake-feature/c-feature-3.jpg',
      'assets/img/cake-feature/c-feature-4.jpg',
      'assets/img/cake-feature/c-feature-5.jpg',
      'assets/img/cake-feature/c-feature-6.jpg',
      'assets/img/cake-feature/c-feature-7.jpg',
    ];
  }

  ngOnInit() {
    this.fetchCakes();
    // Listen for clicks outside to close the dropdown
    document.addEventListener('click', this.onClickOutside.bind(this));
    this.cakeForm = this.fb.group({
      cakeTitle: ['', Validators.required],
      cakeInterior: ['', Validators.required],
      cakeCover: [[], Validators.required],
      personalMessage: [''],
      cakeShape: ['', Validators.required],
      additionalSuggestions: [''],
      extras: this.fb.group({
        candles: [false],
        sparklers: [false],
      }),
      deliveryOption: ['', Validators.required],
    });

    this.buyerForm = this.fb.group({
      buyerName: ['', Validators.required],
      buyerEmail: ['', [Validators.required, Validators.email]],
      buyerPhone: ['', Validators.required],
      deliveryDetails: this.fb.group({
        deliveryAddress: [''],
        deliveryCity: [''],
        deliveryPostalCode: [''],
      }),
      orderDate: ['', Validators.required],
    });

    this.cakeForm.get('deliveryOption')?.valueChanges.subscribe((value) => {
      const deliveryDetails = this.buyerForm.get('deliveryDetails');
      if (deliveryDetails) {
        const deliveryAddress = deliveryDetails.get('deliveryAddress');
        const deliveryCity = deliveryDetails.get('deliveryCity');
        const deliveryPostalCode = deliveryDetails.get('deliveryPostalCode');

        if (value === 'delivery') {
          deliveryAddress?.setValidators(Validators.required);
          deliveryCity?.setValidators(Validators.required);
          deliveryPostalCode?.setValidators(Validators.required);
        } else {
          deliveryAddress?.clearValidators();
          deliveryCity?.clearValidators();
          deliveryPostalCode?.clearValidators();
        }

        deliveryAddress?.updateValueAndValidity();
        deliveryCity?.updateValueAndValidity();
        deliveryPostalCode?.updateValueAndValidity();
      }
    });
  }

  ngOnDestroy() {
    // Remove the event listener when the component is destroyed
    document.removeEventListener('click', this.onClickOutside.bind(this));
  }

  fetchCakes(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.cakes = data.filter((product) => product.type === 'Tort');
      },
      (error) => {
        console.error('Error fetching cakes', error);
      }
    );
  }

  getImageUrl(imageName: string): string {
    return `${this.baseUrl}/${imageName}`;
  }

  orderCake(cake: Product): void {
    this.router.navigate(['/order', cake.id]); // Navigate to the new route
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCakeInterior(option: Option): void {
    this.selectedCakeInterior = option;
    this.cakeForm?.get('cakeInterior')?.setValue(option.value ?? '');
    this.dropdownOpen = false;
  }

  // Close the dropdown when clicking outside
  onClickOutside(event: MouseEvent): void {
    if (!this.dropdownOpen) {
      return;
    }

    const target = event.target as HTMLElement;
    const isClickInside = target.closest('.custom-select-wrapper');

    if (!isClickInside) {
      this.dropdownOpen = false;
    }
  }

  onOptionChange(option: string) {
    this.selectedOption = option;
    // if (option === 'delivery') {
    //   this.orderForm.get('address').setValidators([Validators.required]);
    //   this.orderForm.get('city').setValidators([Validators.required]);
    //   this.orderForm.get('postalCode').setValidators([Validators.required]);
    // } else {
    //   this.orderForm.get('address').clearValidators();
    //   this.orderForm.get('city').clearValidators();
    //   this.orderForm.get('postalCode').clearValidators();
    // }
    // this.orderForm.get('address').updateValueAndValidity();
    // this.orderForm.get('city').updateValueAndValidity();
    // this.orderForm.get('postalCode').updateValueAndValidity();
  }
  toggleCustomCakeSection(): void {
    this.showCustomCakeSection = !this.showCustomCakeSection;
  }
  toggleCakeSelectionSection(): void {
    this.showCakeSelectionSection = !this.showCakeSelectionSection;
  }
  goToNextForm() {
    if (this.cakeForm.valid) {
      this.showBuyerDetails = true;
    } else {
      this.snackBar.open('Nu ai completat toate campurile', 'Inchide', {
        duration: 4000, // Duration in milliseconds
        verticalPosition: 'top', // Position of the snackbar
        horizontalPosition: 'center', // Position of the snackbar
      });
    }
  }

  goBackToFirstForm() {
    this.showBuyerDetails = false;
  }

  submitOrder() {
    const formValue = this.cakeForm.value;
    formValue.cakeCover = this.getSelectedCakeCoverLabels();
    const orderDetails = {
      ...this.cakeForm.value,
      ...this.buyerForm.value,
    };
    this.http
      .post('http://localhost:8080/orderCustomCake', orderDetails)
      .subscribe(
        (response) => {
          this.snackBar.open('Comanda a fost plasata cu succes!', 'Inchide', {
            duration: 5000, // Duration in milliseconds
            verticalPosition: 'top', // Position of the snackbar
            horizontalPosition: 'center', // Position of the snackbar
          });
          // Add any additional logic or handling for a successful order submission
        },
        (error) => {
          this.snackBar.open(`A aparut o eroare.`, 'Inchide', {
            duration: 5000, // Duration in milliseconds
            verticalPosition: 'top', // Position of the snackbar
            horizontalPosition: 'center', // Position of the snackbar
          });
          // Add any error handling logic or display error messages to the user
        }
      );
  }

  getSelectedCakeCoverLabels(): string[] {
    const selectedOptions = this.cakeForm.get('cakeCover')?.value || [];
    return selectedOptions.map((option: { label: string }) => option.label);
  }
}
