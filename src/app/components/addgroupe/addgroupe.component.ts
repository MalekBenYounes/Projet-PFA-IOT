import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupeService } from 'src/app/services/groupe.service';
import { Groupe, PermissionElement } from 'src/app/models/groupe';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-addgroupe',
  templateUrl: './addgroupe.component.html',
  styleUrls: ['./addgroupe.component.css'],
})
export class AddgroupeComponent {
  nom = '';
  liper: PermissionElement[] = [];
  checkOptionsOne: any[] = [];
  constructor(private groupeService: GroupeService, private router: Router) {}
  @Input() isVisibleG = false;
  @Output() newItemEvent = new EventEmitter<boolean>();

  isOkLoadingG = false;
  ngOnInit(): void {
    this.groupeService.getper().subscribe((data) => {
      this.liper = data.permissions;
      this.liper.forEach((e) => {
        this.checkOptionsOne.push({
          label: e.nom,
          value: e.id,
          checked: false,
        });
      });
    });
    this.message = '';
  }
  message: string = '';

  newliste: any[] = [];
  handleOkG(): void {
    if (this.nom == '') {
      this.message = 'veuillez saisir le nom du groupe';
    } else {
      this.isOkLoadingG = true;

      this.checkOptionsOne.forEach((e) => {
        if (e.checked) {
          this.newliste.push(e.value);
        }
      });

      this.groupeService.createGroupe(this.nom, this.newliste).subscribe({
        next: () => {
          setTimeout(() => {
            this.isVisibleG = false;
            this.newItemEvent.emit(this.isVisibleG);
            this.isOkLoadingG = false;
          }, 1000);
          this.router.navigate(['/dashboard/groupe']);
          window.location.reload();
        },
        error: (err: HttpErrorResponse) => {
          const errorMessage = err.error.message;

          this.message = errorMessage;
          console.log(this.message);
        },
      });
    }
  }

  handleCancelG(): void {
    this.isVisibleG = false;
    this.newItemEvent.emit(this.isVisibleG);
  }

  allChecked = false;
  indeterminate = true;

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map((item) => ({
        ...item,
        checked: true,
      }));
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map((item) => ({
        ...item,
        checked: false,
      }));
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every((item) => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every((item) => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
}
