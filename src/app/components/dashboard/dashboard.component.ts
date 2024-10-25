import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Etage } from 'src/app/models/etage';
import { Groupe } from 'src/app/models/groupe';
import { User, UserClass } from 'src/app/models/user';
import { PlaceService } from 'src/app/services/place.service';
import { UserService } from 'src/app/services/user.service';
import { GroupeService } from 'src/app/services/groupe.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @Input()
  public liStages: Etage[] = [];
  user!: User;
  theme = true;
  message = '';
  liGroupe: Groupe[] = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private placeService: PlaceService,
    private groupeService: GroupeService
  ) {}
  token = localStorage.getItem('token');
  ngOnInit(): void {

    this.userService.getprofil(this.token).subscribe((data) => {
      this.user = data;
    });

    this.groupeService.getgroupe().subscribe((data) => {
      this.liGroupe = data;
    });
  }

  log(data: string): void {
    console.log(data);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
  goToPage(page: string) {
    this.router.navigate(['/dashboard/' + page]);
  }
  goToParking(page: string, stage: Etage) {
    this.router.navigate(['/dashboard/' + page, stage.nom]);
  }

  isVisible = false;
  isVisibleG = false;
  isOkLoading = false;

  place!: string;
  np!: number;
  convertToUpperCase() {
    this.place = this.place.toUpperCase();
  }
  showModal(): void {
    this.isVisible = true;
  }
  showModalG(): void {
    this.isVisibleG = true;
  }

  handleOk(): void {

    this.placeService.createEtage(this.place, this.np).subscribe
    ({
      next: () => {
        this.isOkLoading = true;
        setTimeout(() => {
          this.isVisible = false;
          this.isOkLoading = false;
        }, 3000);
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage = err.error.message;
        console.log(err);

        this.message = errorMessage;
      },
    });
    // ((res) => {
    //   console.log(res);
    //   window.location.reload();
    // });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  hasPermission(per: string) {
    const gr = this.liGroupe.find((g) => g.nom === this.user.groupe);

    if (gr) {
      const pers = gr.permissions.find((p) => p.nom == per);
      if (pers) {
        return true;
      }
    }

    return false;
  }

  disable(per1:string,per2:string){
    if(this.hasPermission(per1)||this.hasPermission(per2)){
      return true
    }
    return false
  }

  close( e : any){
    this.isVisibleG=false;
  }
}
