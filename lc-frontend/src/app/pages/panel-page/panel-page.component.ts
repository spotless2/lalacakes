import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../interfaces/Order';
import { OrderDetailsModalComponent } from '../../components/modals/order-details-modal/order-details-modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-panel-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [OrderService, DatePipe],
  templateUrl: './panel-page.component.html',
  styleUrl: './panel-page.component.css',
})
export class PanelPageComponent {
  orders: Order[] = [];
  incomingOrders: Order[] = [];
  completedOrders: Order[] = [];

  constructor(
    @Inject(NgbModal) private modalService: NgbModal,
    private orderService: OrderService,
    private datePipe: DatePipe
  ) {}
  ngOnInit() {
    this.fetchOrders();
  }
  fetchOrders() {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        console.log(orders);
        this.orders = orders;
        this.filterOrders();
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  openOrderDetails(order: Order) {
    const modalRef = this.modalService.open(OrderDetailsModalComponent, {});
    modalRef.componentInstance.order = order;
  }

  changeOrderStatus(order: Order) {
    const statuses = ['Primita', 'In desfasurare', 'Completa'];
    const currentIndex = statuses.indexOf(order.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    order.status = statuses[nextIndex];
    this.filterOrders();
  }
  filterOrders() {
    this.incomingOrders = this.orders.filter(
      (order) => order.status !== 'Completa'
    );
    this.completedOrders = this.orders.filter(
      (order) => order.status === 'Completa'
    );
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
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }
}
