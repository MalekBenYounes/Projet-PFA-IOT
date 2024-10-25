import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User, UserClass } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css'],
})
export class ParametreComponent {
  user!: User;
  value = true;
  confirmpass = '';
  message = '';
  modalRef!: NzModalRef;
  isVisibleM = false;
  isVisibleS = false;

  constructor(private userService: UserService, private router: Router) {}

  token = localStorage.getItem('token');

  ngOnInit(): void {
    this.value = true;
    this.isVisibleM = false;
    this.isVisibleS = false;
    this.message = '';
    this.confirmpass = '';
    this.userService.getprofil(this.token).subscribe((data) => {
      this.user = data;
    });
  }

  modifier() {
    this.value = false;
  }
  confirmer() {
    this.isVisibleM = true;

  }
  supprimer() {
    this.isVisibleS = true;

  }

  annuler() {
    this.ngOnInit();
  }
  handleOkM(): void {

      this.userService
        .updateprofil(this.token, this.user, this.confirmpass)
        .subscribe({
          next: () => {
            this.isVisibleM = false;

            window.location.reload();
          },
          error: (err: HttpErrorResponse) => {
            const errorMessage = err.error.message;
            console.log(err);

            this.message = errorMessage;
          },
        });

  }

  handleCancelM(): void {
    console.log('Button cancel clicked!');

    this.ngOnInit();
  }
  handleOkS(): void {

      this.userService.deleteprofil(this.token, this.confirmpass).subscribe({
        next: () => {
      this.router.navigate(['']);
      localStorage.removeItem('token');
        },
        error: (err: HttpErrorResponse) => {
          const errorMessage = err.error.message;
          console.log(err);

          this.message = errorMessage;
        },
      });

  }

  handleCancelS(): void {
    console.log('Button cancel clicked!');

    this.ngOnInit();
  }
}
