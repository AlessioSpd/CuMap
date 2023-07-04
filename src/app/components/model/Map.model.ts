export interface IMarker {
    name: string,
    lng: number,
    lat: number,
    description: string
}

export interface ILayer {
    id: number,
    name: string,
    checked: boolean,
    markers: IMarker[]
}

export class IMap {
    owner: string = "";
    map_name: string = "";
    layers: ILayer[] = [];
    numberOfLayer: number = 0;
    views: number = 0;
    last_check: string = "";
    
    constructor(
        owner: string = "",
        name:string = "New map",
        layer: ILayer[] = [],
        nLayer: number = 0,
        views: number = 0,
        last_check: string = ""
    ) {
        this.owner = owner;
        this.map_name = name;
        this.layers = layer;
        this.numberOfLayer = nLayer;
        this.views = views;
        this.last_check = last_check;
    }

    getLayersNumber() : number { return this.numberOfLayer};
    
    addNewLayer(newLayer: ILayer) {
        this.layers.push(newLayer);
        this.numberOfLayer += 1;
    }

    deleteLayerById(id: number) {
        this.layers = this.layers.filter(function (obj) {
            return obj.id !== id;
        })
    }
}