export interface Product {
    id?: number; // Optional, as it might not be present when creating a new product
    title: string;
    price: number;
    image: string;
    description: string;
    ingredients: string;
    type: 'Tort' | 'Platou'; // Assuming type can be either 'cake' or 'plate'
  }