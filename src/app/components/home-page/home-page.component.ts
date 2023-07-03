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
    "11.23 PM"
  );

  newLayer() {
    let layer = {
      name: "New layer",
      checked: true,
      markers: []
    }

    this.currentMap.layers.push(layer);
  }
}