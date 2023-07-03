import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  layers = [
    {
      checked: true,
      name: "Roma",
      markers: [
        {nome: "Romanè"},
        {nome: "Romanè"},
        {nome: "Romanè"}
      ]
    },
    {
      checked: true,
      name: "Cosenza",
      markers: [
        {nome: "Romanè"}
      ]
    }
  ];
}
