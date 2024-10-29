import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Etage, Place } from 'src/app/models/etage';
import { Hist, HistElement } from 'src/app/models/history';
import { PlaceService } from 'src/app/services/place.service';
import { HistService } from 'src/app/services/hist.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  date: any[] = [];
  validateForm!: UntypedFormGroup;
  liStages: Etage[] = [];
  liPlaces: Place[] = [];
  liHist: any[] = [];
  etage: string = '';
  id_place: string = '';
  teste: HistElement[] = [];
  nomEtage : string='';

  constructor(
    private placeService: PlaceService,
    private fb: UntypedFormBuilder,
    private histService: HistService
  ) {}
  ngOnInit(): void {
    this.placeService.getDonnees().subscribe((data) => {
      this.liStages = data;
    });
  }

  onSelectionChange() {
    console.log(this.etage);

    let i: number;

    for (i = 0; i < this.liStages.length; i++) {
      
      if (this.liStages[i].nom == this.etage) {
        this.liPlaces = this.liStages[i].places;
      }
    }
    console.log(this.liPlaces)
  }
  onSelectionPlace() {
    console.log('id place', this.id_place);
    if (this.date.length === 0) {
      this.histService.gethist(this.id_place).subscribe((data) => {
        this.teste = data.hist;
        this.liHist = [];
        this.teste.forEach((e) => {
          if (e.update_date) { // Vérification de la validité de la date
            const dateteste = new Date(e.update_date);
            if (!isNaN(dateteste.getTime())) { // Vérifie si la date est valide
              const isoString = dateteste.toISOString();
              this.liHist.push({
                date: isoString.split('T')[0],
                heure: isoString.split('T')[1].split('.')[0],
                etat: e.last_state,
              });
            } else {
              console.warn(`Date invalide pour l'élément :`, e);
            }
          }
        });
        console.log(this.liHist);
      });
    } else {
      this.histService.gethistbydate(this.id_place, this.date).subscribe((data) => {
        this.teste = data.hist;
        this.liHist = [];
        this.teste.forEach((e) => {
          if (e.update_date) {
            const dateteste = new Date(e.update_date);
            if (!isNaN(dateteste.getTime())) {
              const isoString = dateteste.toISOString();
              this.liHist.push({
                date: isoString.split('T')[0],
                heure: isoString.split('T')[1].split('.')[0],
                etat: e.last_state,
              });
            } else {
              console.warn(`Date invalide pour l'élément :`, e);
            }
          }
        });
        console.log(this.liHist);
      });
    }
  }
  

  onChange(result: Date[]): void {
    if (this.date.length == 0) {
      if (this.id_place != '') {
        this.onSelectionPlace();
      }
    } else {
      console.log('onChange: ', result);
      const parsedDated = new Date(result[0]);
      const parsedDatef = new Date(result[1]);
      const offsetd = parsedDated.getTimezoneOffset() * 60000;
      const offsetf = parsedDatef.getTimezoneOffset() * 60000;
      // Convertit le décalage en millisecondes de date d pour debut et f pour fin

      const localDated = new Date(
        parsedDated.getTime() - offsetd
      ).toISOString();
      const localDatef = new Date(
        parsedDatef.getTime() - offsetf
      ).toISOString();
      // Utilisation de la méthode toISOString() pour convertir la date au format ISO 8601

      const dateOnlyd: string = localDated.split('T')[0];
      this.date[0] = dateOnlyd;

      const dateOnlyf: string = localDatef.split('T')[0];
      this.date[1] = dateOnlyf;

      console.log('Date:', dateOnlyd);
      console.log('Date:', dateOnlyf);
      console.log(this.date);
      if (this.id_place != '') {
        this.onSelectionPlace();
      }
    }
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
}

function getISOWeek(value: Date, index: number, array: Date[]): unknown {
  throw new Error('Function not implemented.');
}
