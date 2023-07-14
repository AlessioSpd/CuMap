import { Component, OnInit, ViewChild } from '@angular/core';
import { IMap, ILayer, IMarker } from '../model/Map.model';
import { Subject } from 'rxjs'
import { MapCommonComponent } from '../map-common/map-common.component';
import { ApiServiceService } from 'src/app/api_services/api-service.service';
import { decode } from "@googlemaps/polyline-codec";
import { FormControl, FormGroup } from '@angular/forms';

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
  searchForm!: FormGroup;
  suggestionsResult!: {title:string, detail:string, id:string}[];
  showSuggestionContainer!: boolean

  updateLayerEvent!: Subject<IMarker>;
  @ViewChild(MapCommonComponent) mapComp!: MapCommonComponent;

  constructor(private apiServ: ApiServiceService){}

  ngOnInit(): void {
    this.currentMap = new IMap(
      "Pam4k4",
      "Alessio's map",
      [],
      0,
      0,
      "11.23 PM"
    );

    this.searchForm = new FormGroup({
      searchFormInput: new FormControl('')
    });
    
    this.toggleModal = false;
    this.activedLayer = 1;
    this.suggestionsResult = [];
    this.showSuggestionContainer = false;

    this.tempNewMarker = {
      name: "",
      lng: 0,
      lat: 0,
      description: ''
    }
    
    this.updateLayerEvent = new Subject<IMarker>();

    this.searchForm.controls['searchFormInput']
      .valueChanges.subscribe(newValue => {
        if(newValue !== '') {
          this.showSuggestionContainer = true;

          newValue = newValue.replaceAll(' ',  '+');
          let slice: string = newValue.match(/(.*[a-zA-Z]+)\+*/);
          // console.log(slice[1]);          
          this.apiServ.getSuggestion(slice[1]).subscribe((res) => {
            this.suggestionsResult = [];
            res.suggestions.map((sugg: { name: string; place_formatted: string; mapbox_id:string}) => {
              this.suggestionsResult.push({title: sugg.name, detail: sugg.place_formatted, id:sugg.mapbox_id})});
          });
        } else {
          this.showSuggestionContainer = false;
          this.suggestionsResult = [];
        }
      })
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

  getCurrentPosition() {
    this.mapComp.getMyPosition()
  }

  newTrack(){
    this.apiServ.getDirection('12.48545859924775,41.89214066211926','12.459240072121816,41.90602150170318').subscribe((res) => {
      console.log(res)
      this.mapComp.newTrack(decode(res.routes[0].geometry))
    });
  }

  searchInput(id: string) {
    this.searchForm.controls['searchFormInput'].setValue('');
    this.apiServ.getPlaceFromId(id).subscribe((res) => {
      this.mapComp.flyTo(res.features[0].geometry.coordinates[0], res.features[0].geometry.coordinates[1])
    });
  }
}