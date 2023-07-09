import { Component } from '@angular/core';
import { IMap, ILayer, IMarker } from '../model/Map.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  currentMap :IMap = new IMap(
    "Pam4k4",
    "Alessio's map",
    [],
    0,
    0,
    "11.23 PM"
  );

  toggleModal: boolean = false;
  activedLayer: number = -1;

  newLayer() {

    let layer = {
      id: this.currentMap.getLayersNumber()+1,
      name: "New layer",
      checked: true,
      markers: []
    }

    this.currentMap.addNewLayer(layer);
    console.log(layer);
  }

  deleteLayer(id: number) {
    console.log("sto per eliminare la lista " + id)
    this.currentMap.deleteLayerById(id);
  }

  newMarker(marker: IMarker) {
    this.toggleModal=!this.toggleModal;
    console.log(marker);
  }

  closeModal(modal: boolean) {
    this.toggleModal= !this.toggleModal;
  }

  selectLayer(layer: ILayer) {
    this.activedLayer = layer.id
    console.log(layer)
  }
}