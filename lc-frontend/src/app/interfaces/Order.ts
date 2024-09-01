export interface Extras {
  candles: boolean;
  sparklers: boolean;
}

export interface DeliveryDetails {
  deliveryCity: string;
  deliveryAddress: string;
  deliveryPostalCode: string;
}

export interface Order {
  id: number;
  status: string;
  productTitle: string;
  cakeTitle: string;
  cakeInterior: string;
  cakeCover: string[];
  personalMessage: string;
  cakeShape: string;
  additionalSuggestions: string;
  extras: Extras;
  deliveryOption: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  deliveryDetails: DeliveryDetails;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
}