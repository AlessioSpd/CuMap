import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { ILayer, IMarker } from '../model/Map.model';
import { Observable, Subscription } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { LatLngTuple, decode } from "@googlemaps/polyline-codec";

@Component({
  selector: 'app-map-common',
  templateUrl: './map-common.component.html',
  styleUrls: ['./map-common.component.scss']
})
export class MapCommonComponent implements OnInit, OnDestroy{

  existingPoint: mapboxgl.Marker[] = [];
  count: number = 0;

  @Output() newMarkerEmitter = new EventEmitter<IMarker>();
  
  private _eventsSubscription!: Subscription;
  private _mapMarkers!: IMarker[];
  
  @Input() markerLayersEventHandler!: Observable<IMarker>;
  mapLayer!: IMarker;

  map!: mapboxgl.Map;
  token = 'pk.eyJ1IjoicGFtNGs0IiwiYSI6ImNsamxzbmpkNTB6Y2szZXBwdWh1dngwZ3QifQ.kR2_3RYgq9JBYLoHQ7GkeA'

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    (mapboxgl as typeof mapboxgl).accessToken = this.token;
    
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/pam4k4/cljlsq5od009201o4ene7fhgp', // style URL
      center: [12.4963655, 41.9027835], // starting position [lng, lat]
      zoom: 10 // starting zoom
    });

    this.map.on('click', (e) => {
      let newMarkerPosition: IMarker = {
        name: "",
        lng: e.lngLat.wrap()['lng'],
        lat: e.lngLat.wrap()['lat'],
        description: ""
      }
      
      this.newMarkerEmitter.emit(newMarkerPosition);
    });

    this._mapMarkers = [];

    this._eventsSubscription = this.markerLayersEventHandler.subscribe((value) =>{
      this._mapMarkers.push(value);
      new mapboxgl.Marker()
          .setLngLat([value.lng , value.lat])
          .addTo(this.map)
    })
  }

  ngOnDestroy(): void {
    this._eventsSubscription.unsubscribe();
  }

  getMyPosition(){
    console.log("entrato");
    // get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.map.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 16,
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      }, 
      () => {}, 
      {enableHighAccuracy:true}
    );
  }

  newTrack(coords: LatLngTuple[]) {
    console.log(coords);
    coords.map((el) => {el.reverse()})

    this.map.addSource('route', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coords
        }
      }
    });

    this.map.addLayer({
      'id': 'route',
      'type':'line',
      'source':'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
    })
  }

  flyTo(lng:number, lat:number) {
    this.map.flyTo({
      center: [lng, lat],
      zoom: 12,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
  }
}
