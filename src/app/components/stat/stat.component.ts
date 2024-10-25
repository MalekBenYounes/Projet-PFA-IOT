import { Component } from '@angular/core';
import { Etage } from 'src/app/models/etage';
import { HistElement } from 'src/app/models/history';
import { HistService } from 'src/app/services/hist.service';
import { PlaceService } from 'src/app/services/place.service'

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent {

  liHist: any[] = [];
  etage: string = '';
  id_place: string = '';
  teste: HistElement[] = [];
  nomEtage : string='';
  mode = 'week';
  date: any[] = [];
  liStages: Etage[] =[];
  option: any;
  datelist:string[]=[];


  constructor(private placeService: PlaceService,private histService: HistService) {}
  ngOnInit() {

    this.placeService.getDonnees().subscribe(data => {
      this.liStages=data;
      console.log(this.liStages);

    });



    this.option =  {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {

        data: ['Parking','Etage','Place']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: this.datelist
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Parking',
          type: 'bar',
          label: this.labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290]
        },
        {
          name: 'Etage',
          type: 'bar',
          barGap: 0,
          label: this.labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390]
        },
        {
          name: 'Place',
          type: 'bar',
          label: this.labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290]
        },


      ]
    };
  }
  onChange(result: Date[]): void {
    console.log(result);
    const parsedDated = new Date(result[0]);
    // Modification du jour et du mois
    parsedDated.setDate(1); // Modifier le jour
    parsedDated.setMonth(0); // Modifier le mois
    const parsedDatef = new Date(result[1]);
    // Modification du jour et du mois
    parsedDatef.setDate(30); // Modifier le jour
    parsedDatef.setMonth(11); // Modifier le mois
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
    const inter = parsedDatef.getFullYear()-parsedDated.getFullYear();
    for(let i=0; i<inter;i++)
    {
      let an =parsedDated.getFullYear()+i;
      this.datelist.push(an.toString())
      console.log(this.datelist);


    }
    this.histService
    .gethistbydate(this.id_place, this.date)
    .subscribe((data) => {
      this.teste = data.hist;
      this.liHist = [];
      this.teste.forEach((e) => {
        const dateteste = new Date(e.update_date).toISOString();
        this.liHist.push({
          date: dateteste.split('T')[0],
          heure: dateteste.split('T')[1].split('.')[0],
          etat: e.last_state,
        });
      });
      console.log(this.liHist);
    });
  }

   labelOption = {
    show: true,
    position: 'insideBottom',
    distance: 15,
    align: 'left',
    verticalAlign: 'middle',
    rotate: 90,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {}
    }
  };




}
