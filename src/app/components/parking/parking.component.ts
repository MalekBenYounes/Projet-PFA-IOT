import { Component, Input } from '@angular/core';
import { Etage, Place } from 'src/app/models/etage';
import { PlaceService } from 'src/app/services/place.service';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as socketIO from 'socket.io-client';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent {
  liplaces: Place[] = [];
  liStages: Etage[] = [];

  constructor(
    private placeService: PlaceService,
    private modal: NzModalService
  ) {
    const url = 'ws://localhost:3000';
    const socket = socketIO.connect(url);
    socket.on('update', (data) => {
      this.ngOnInit();
    });

    // Déclenche ngOnInit toutes les 5 secondes
    setInterval(() => {
      this.ngOnInit();
    }, 5000); // 5000 ms = 5 secondes
  }

  ngOnInit() {
    this.placeService.getDonnees().subscribe((data) => {
      this.liStages = data;
      console.log(this.liStages[0].places);
    });
    this.placeService.getPlaces().subscribe((data) => {
      this.liplaces = data.places;
      console.log(this.liplaces);
    });
  }

  getBackgroundColor(id: any): string {
    const place = this.liplaces.find(place => place.id === id);
    let s = place?.etat;
    return s ? 'green' : 'red';
  }

  nzTabPosition: NzTabPosition = 'top';
  selectedIndex = 0;

  demoValue = 0;

  log(args: any[]): void {
    console.log(args);
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Vous êtes sûr de vouloir supprimer cet étage ?',
      nzContent: 'Etage ' + this.liStages[this.selectedIndex].nom,
      nzOkText: 'OUI',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.placeService
          .deleteEtage(this.liStages[this.selectedIndex].nom)
          .subscribe((res) => {
            console.log(res);
            this.refreshPage();
          }),
      nzCancelText: 'NON',
      nzOnCancel: () => console.log('NON'),
    });
  }

  isVisible = false;
  showModal(): void {
    this.isVisible = true;
    this.demoValue = this.liStages[this.selectedIndex].places.length;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.placeService
      .updateEtage(this.liStages[this.selectedIndex].id, this.demoValue)
      .subscribe((res) => {
        console.log(res);
        this.refreshPage();
      });
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  refreshPage() {
    this.ngOnInit();
  }
}
