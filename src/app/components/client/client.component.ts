import { Component } from '@angular/core';
import { Place } from 'src/app/models/etage';
import { PlaceService } from 'src/app/services/place.service';
import * as socketIO from 'socket.io-client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent {
  liPlaces: Place[] = [];
  plibre = 0;
  oplace = 0;

  constructor(private placeService: PlaceService) {
    const url = 'ws://localhost:3000';
    const socket = socketIO.connect(url);
    socket.on('update', (data) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.plibre = 0;
    this.oplace = 0;
    this.placeService.getPlaces().subscribe((data) => {
      this.liPlaces = data.places;
      console.log(this.liPlaces);

      this.liPlaces.forEach((p) => {
          if (p.etat) {
            this.plibre = this.plibre + 1;
          }

      });
      this.oplace=this.liPlaces.length-this.plibre;

      console.log(this.plibre);
      console.log(this.oplace);
    });


  }
  // for (let i = 0; i < this.places.length; i++) {
  //   if(this.places[i].etat){
  //     this.plibre=this.plibre+1;
  //   };
  // };
  // this.oplace=this.places.length-this.plibre;
}
