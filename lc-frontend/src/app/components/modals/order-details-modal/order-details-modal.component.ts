import { Component, Inject, inject, Input, TemplateRef } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../interfaces/Order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.css']
})
export class OrderDetailsModalComponent {
  @Input() order: Order | undefined;

  constructor(@Inject(NgbActiveModal) public activeModal: NgbActiveModal) {}

  ngAfterViewInit() {
    $("#myModal").prependTo("body");
  }

  close() {
    this.activeModal.close();
  }
}