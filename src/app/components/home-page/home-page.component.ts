import { Component, OnInit } from '@angular/core';
import { IMap, ILayer, IMarker } from '../model/Map.model';
import { Subject } from 'rxjs'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  currentMap!: IMap;
  toggleModal!: boolean;
  activedLayer!: number;
  tempNewMarker!: IMarker;

  updateLayerEvent!: Subject<IMarker>;

  ngOnInit(): void {
    this.currentMap = new IMap(
      "Pam4k4",
    "Alessio's map",
    [],
    0,
    0,
    "11.23 PM"
    );
    
    this.toggleModal = false;
    this.activedLayer = 1

    this.tempNewMarker = {
      name: "",
      lng: 0,
      lat: 0,
      description: ''
    }
    
    this.updateLayerEvent = new Subject<IMarker>();

  }

  emitEventToChild(marker: IMarker) {
    this.updateLayerEvent.next(marker);
  }

  newLayer() {
    let layer = {
      id: this.currentMap.getLayersNumber()+1,
      name: "New layer",
      checked: true,
      markers: []
    }

    this.currentMap.addNewLayer(layer);
    this.activedLayer = layer.id;
  }

  deleteLayer(id: number) {
    console.log("sto per eliminare la lista " + id)

    this.currentMap.deleteLayerById(id);
    
    if( id === this.activedLayer && this.currentMap.layers.length!==0) {
        this.activedLayer = this.currentMap.layers[0].id;
    }
  }

  newMarker(marker: IMarker) {
    this.tempNewMarker = marker;
    this.toggleModal=!this.toggleModal;
  }

  closeModal(modal: boolean) {
    this.toggleModal= !this.toggleModal;
  }

  saveMarkEvent(marker: IMarker) {
    console.log(marker)
    if (this.currentMap.layers.length==0) {
      this.newLayer();
    }
    this.currentMap.addNewMarkerAtLayer(marker, this.activedLayer);
    this.emitEventToChild(marker);
  }

  selectLayer(layer: ILayer) {
    this.activedLayer = layer.id;
  }
}