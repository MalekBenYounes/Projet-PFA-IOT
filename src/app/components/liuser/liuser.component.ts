import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Groupe } from 'src/app/models/groupe';
import { GroupeService } from 'src/app/services/groupe.service';
@Component({
  selector: 'app-liuser',
  templateUrl: './liuser.component.html',
  styleUrls: ['./liuser.component.css']
})
export class LiuserComponent {

  liGroupes: Groupe[] = [];
  selectedValue = "";
  searchValue = '';
  visible = false;
  liUsers: User[] = [];
  listOfDisplayData = [...this.liUsers];

  constructor( private userService: UserService,private modal: NzModalService,private groupeService: GroupeService) {}
  ngOnInit(): void {
    this.userService.getuser().subscribe(data => {
      this.liUsers=data;

    });
    this.groupeService.getgroupe().subscribe((data) => {
      this.liGroupes=data;

    });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.liUsers.filter((item: User) => item.nom.indexOf(this.searchValue) !== -1);
  }

  isEditing = false;

  startEditing() {
    this.isEditing = true;
  }

  stopEditing() {
    this.isEditing = false;
  }

  showDeleteConfirm(user:User): void {
    this.modal.confirm({
      nzTitle: 'Vous êtes sûr de vouloir supprimer cet utilisateur ?',
      nzContent:user.nom+' '+user.prenom ,
      nzOkText: 'OUI',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>this.userService.deleteUser(user._id).subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }),


      nzCancelText: 'NON',
      nzOnCancel: () => console.log('NON')
    });

  }
  userid:string="";
  isVisible = false;
  showModal(user:User): void {
    this.selectedValue = user.groupe;
    this.isVisible = true;
    this.userid=user._id;

  }

  handleOk(): void {
    console.log(this.userid);
     this.userService.updateUser(this.userid,this.selectedValue).subscribe(res => {
       this.ngOnInit();
       console.log(res);})
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
