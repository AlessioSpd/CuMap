import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMarker } from '../model/Map.model';

@Component({
  selector: 'app-new-marker-modal',
  templateUrl: './new-marker-modal.component.html',
  styleUrls: ['./new-marker-modal.component.scss']
})
export class NewMarkerModalComponent implements OnInit {
  
  markerForm!: FormGroup;

  @Input() toggleModal!: boolean;
  @Input() newMarkerInfo!: IMarker;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() saveMarkerEvent = new EventEmitter<IMarker>();

  ngOnInit(): void {
    this.markerForm = new FormGroup({
      markerName: new FormControl('', Validators.required),
      markerDescription: new FormControl()
    })

    this.toggleModal = false;
  }

  closeModal() {
    this.closeModalEvent.emit(false);
  }

  saveMarker() {
    this.newMarkerInfo.name = this.markerForm.get('markerName')!.value;
    this.newMarkerInfo.description = this.markerForm.get('markerDescription')!.value;
    this.markerForm.reset()
    this.closeModal();
    this.saveMarkerEvent.emit(this.newMarkerInfo);
  }
}
