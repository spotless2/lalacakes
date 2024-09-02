import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../interfaces/Order';
import { OrderDetailsModalComponent } from '../../components/modals/order-details-modal/order-details-modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProductModalComponent } from '../../components/modals/add-product-modal/add-product-modal.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-panel-page',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  providers: [OrderService, DatePipe, ProductService],
  templateUrl: './panel-page.component.html',
  styleUrl: './panel-page.component.css',
})
export class PanelPageComponent {
  selectedTab: string = 'orders';
  orders: Order[] = [];
  products: Product[] = [];
  incomingOrders: Order[] = [];
  completedOrders: Order[] = [];
  cakes: any[] = [];
  plates: any[] = [];

  constructor(
    @Inject(NgbModal) private modalService: NgbModal,
    private orderService: OrderService,
    private productService: ProductService,
    private datePipe: DatePipe,
    @Inject(MatDialog) private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.fetchOrders();
    this.fetchProducts()
  }
  fetchOrders() {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.filterOrders();
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.categorizeProducts();
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  categorizeProducts(): void {
    this.plates = [];
    this.cakes = [];
    this.products.forEach(product => {
      if (product.type === 'Platou') {
        this.plates.push(product);
      } else if (product.type === 'Tort') {
        this.cakes.push(product);
      }
    });
  }


  openOrderDetails(order: Order) {
    const modalRef = this.modalService.open(OrderDetailsModalComponent, {});
    modalRef.componentInstance.order = order;
  }

  changeOrderStatus(order: Order) {
    const statuses = ['Primita', 'In desfasurare', 'Completa'];
    const currentIndex = statuses.indexOf(order.status.trim());
    const nextIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[nextIndex];

    console.log(order.id)
    console.log(newStatus)

    this.orderService.updateOrderStatus(order.id, newStatus).subscribe(
      () => {
        order.status = newStatus;
        this.filterOrders(); // Re-filter orders after status change
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }
  filterOrders() {
    this.incomingOrders = this.orders.filter(
      (order) => order.status !== 'Completa'
    );
    this.completedOrders = this.orders.filter(
      (order) => order.status === 'Completa'
    );
  }

  refreshProductList(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

    // Products methods
    openAddProductForm() {
      const dialogRef = this.dialog.open(AddProductModalComponent, {
        width: '400px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.refreshProductList();
        }
      });
    }
  
    editProduct(product: any) {
      const dialogRef = this.dialog.open(AddProductModalComponent, {
        width: '400px',
        data: { productId: product.id }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.fetchProducts(); // Refresh the product list after editing
        }
      });
    }
  
    deleteProduct(productId: number): void {
      if (confirm('Are you sure you want to delete this product?')) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.products = this.products.filter((product) => product.id !== productId);
            this.fetchProducts(); // Refresh the product list after deletion
          },
          (error) => {
            console.error('Error deleting product:', error);
          }
        );
      }
    }

  formatDate(date: string | undefined): string {
    if (!date) {
      return 'N/A';
    }
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

  deleteOrder(orderId: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          this.orders = this.orders.filter((order) => order.id !== orderId);
          this.filterOrders()
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }
  
}
