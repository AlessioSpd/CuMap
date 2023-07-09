import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-marker-modal',
  templateUrl: './new-marker-modal.component.html',
  styleUrls: ['./new-marker-modal.component.scss']
})
export class NewMarkerModalComponent {

  @Input() toggleModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeModal() {
    this.closeModalEvent.emit(false);
  }
}
