export interface IMarker {
    name: string,
    lng: number,
    lat: number,
    description: string
}

export interface ILayer {
    name: string,
    checked: boolean,
    markers: IMarker[]
}

export class IMap {
    owner: string = "";
    map_name: string = "";
    layers: ILayer[] = [];
    views: number = 0;
    last_check: string = "";
    
    constructor(
        owner: string = "",
        name:string = "New map",
        layer: ILayer[] = [],
        views: number = 0,
        last_check: string = ""        
    ) {
        this.owner = owner;
        this.map_name = name;
        this.layers = layer;
        this.views = views;
        this.last_check = last_check;
    }
}