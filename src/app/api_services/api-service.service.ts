import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  token="pk.eyJ1IjoicGFtNGs0IiwiYSI6ImNsamxzbmpkNTB6Y2szZXBwdWh1dngwZ3QifQ.kR2_3RYgq9JBYLoHQ7GkeA";

  constructor(private http: HttpClient) {}
  
  getDirection(start: string, end: string){
    return this.http.get<any>(
      "https://api.mapbox.com/directions/v5/mapbox/driving/"+ start +";"+ end +"?access_token=" + this.token
    )
  }
}
