import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { IMarker } from '../model/Map.model';

@Component({
  selector: 'app-map-common',
  templateUrl: './map-common.component.html',
  styleUrls: ['./map-common.component.scss']
})
export class MapCommonComponent implements OnInit{

  existingPoint: mapboxgl.Marker[] = [];
  count: number = 0;

  @Output() newMarkerEmitter = new EventEmitter<IMarker>();
  
  ngOnInit(): void {

    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoicGFtNGs0IiwiYSI6ImNsamxzbmpkNTB6Y2szZXBwdWh1dngwZ3QifQ.kR2_3RYgq9JBYLoHQ7GkeA';
    
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/pam4k4/cljlsq5od009201o4ene7fhgp', // style URL
      center: [12.4963655, 41.9027835], // starting position [lng, lat]
      zoom: 10 // starting zoom
    });

    map.on('click', (e) => {
      let newMarkerPosition: IMarker = {
        name: "",
        lng: e.lngLat.wrap()['lng'],
        lat: e.lngLat.wrap()['lat'],
        description: ""
      }
      
      this.newMarkerEmitter.emit(newMarkerPosition);

      // console.log(long + " - " + lat)
  
      // this.existingPoint.push(new mapboxgl.Marker()
      //     .setLngLat([long , lat])
      //     .addTo(map)
      // )
  
      // console.log(this.existingPoint)
      // this.count = this.count + 1;
      // console.log(this.count);
      // if(this.count == 4) {
      //   this.existingPoint.map(el=>{el.remove()});
      //   this.count = 0;
      // }


    });

  }

}
