import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalDeleteComponent } from '../../shared/modals/modal-delete/modal-delete.component';

@Injectable({ providedIn: 'root' })
export class ModalDeleteService {
  private outlet!: ViewContainerRef;
  private modalRef!: ComponentRef<ModalDeleteComponent>;

  registerOutlet(outlet: ViewContainerRef): void {
    this.outlet = outlet;
  }

  openModal(
    config?: Partial<ModalDeleteComponent>,
    onConfirmDelete?: () => void
  ): void {
    if (!this.outlet) throw new Error('Outlet não registrado!');
    this.outlet.clear();

    this.modalRef = this.outlet.createComponent(ModalDeleteComponent);

    if (config) {
      Object.assign(this.modalRef.instance, config);
    }

    this.modalRef.instance.closeModal.subscribe(() => {
      this.closeModal();
    });

    this.modalRef.instance.confirmDelete.subscribe(() => {
      if (onConfirmDelete) onConfirmDelete();
      this.closeModal();
    });
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.destroy();
    }
  }
}
