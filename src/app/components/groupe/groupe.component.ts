import { Component } from '@angular/core';
import { Groupe, PermissionElement } from 'src/app/models/groupe';
import { GroupeService } from 'src/app/services/groupe.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent {
  isVisible = false;
  liGroupes: Groupe[] = [];
  nom : string="";
  liper: PermissionElement[] = [];
  checkOptionsOne: any[] = [];


  constructor( private groupeService: GroupeService,private modal: NzModalService) {}
  ngOnInit(): void {

    this.checkOptionsOne=[];
    this.groupeService.getgroupe().subscribe(data => {
      this.liGroupes=data;
      this.groupeService.getper().subscribe((data) => {
        this.liper = data.permissions;
        console.log(this.liper);
        this.liper.forEach((e) => {
          this.checkOptionsOne.push({
            label: e.nom,
            value: e.id,
            checked: false,
          });
        });
      });

    });}

    showDeleteConfirm(per:PermissionElement,groupe:Groupe): void {
      this.modal.confirm({
        nzTitle: 'Vous êtes sûr de vouloir supprimer cette permission ?',
        nzOkText: 'OUI',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () =>
        {const index = groupe.permissions.findIndex((element) => element === per);
          let liste:any[]=[];
          if (index !== -1) {
            groupe.permissions.splice(index, 1);
          groupe.permissions.forEach((e)=>{
            liste.push(e.id);
          })
            console.log("Élément supprimé !");
          } else {
            console.log("Élément non trouvé dans la liste.");
          }
          this.groupeService.updateGroupe(groupe.id,liste).subscribe({
            next :()=> {

              this.ngOnInit();
            }
          })
        }
        ,
        nzCancelText: 'NON',
        nzOnCancel: () => console.log('NON')
      });
    }
    showModal(groupe:Groupe): void {
      this.isVisible = true;
      this.nom=groupe.nom;
    }
    newliste: any[] = [];
    handleOk(groupe:Groupe): void {
      console.log(groupe);

        this.checkOptionsOne.forEach((e) => {
          if (e.checked) {
            this.newliste.push(e.value);
          }});
        this.groupeService.updateGroupe(groupe.id,this.newliste).subscribe(
          {
            next: () => {

              this.ngOnInit();
              this.isVisible = false;

            },
            error: (err: HttpErrorResponse) => {

            },
        });
      }



    handleCancel(): void {
      console.log('Button cancel clicked!');
      this.isVisible = false;
    }
    log(args: any[]): void {
      console.log(args);
    }

    DeleteConfirm(groupe:Groupe): void {
      this.modal.confirm({
        nzTitle: 'Vous êtes sûr de vouloir supprimer ce groupe ?',
        nzOkText: 'OUI',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () =>
        this.groupeService.deleteGroupe(groupe.nom).subscribe(res => {
          console.log(res);
          this.ngOnInit();;
        })
        ,
        nzCancelText: 'NON',
        nzOnCancel: () => console.log('NON')
      });
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
  getPermissionName(permissionId: any): string {
    const permission = this.liper.find(perm => perm.id === permissionId);
    return permission ? permission.nom : 'Permission inconnue'; // Message par défaut si non trouvé
  }
  

}
