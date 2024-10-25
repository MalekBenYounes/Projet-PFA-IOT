import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Groupe } from 'src/app/models/groupe';
import { User } from 'src/app/models/user';
import { GroupeService } from 'src/app/services/groupe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent {
  selectedValue = 'Client';
  validateForm!: UntypedFormGroup;
  liUsers: User[] = [];

  submitForm(): void {
    this.userService.createUser(this.validateForm).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/liuser']);
      },
      error: (err: HttpErrorResponse) => {

      },
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls['confirm'].updateValueAndValidity()
    );
  }

  confirmValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: UntypedFormBuilder,
    private groupeService: GroupeService,
    private userService: UserService,
    private router: Router
  ) {}

  liGroupes: Groupe[] = [];
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required,this.uniqueName.bind(this)]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required,this.uniqueMail.bind(this)]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      groupe: ['Client', [Validators.required]],
    });
    this.groupeService.getgroupe().subscribe((data) => {
      this.liGroupes = data;
    });
    this.userService.getuser().subscribe((data) => {
      this.liUsers = data;
    });
  }
  
  uniqueName(control: AbstractControl): ValidationErrors | null {
    if (this.liUsers) {
      if (control.value != null) {
        let user = this.liUsers.find(
          (e) => e.id.toUpperCase() === control.value.toUpperCase()
        );
        if (user !== undefined) {
          return { nameExist: true };
        }
      }
    }
    return null;
  }

  uniqueMail(control: AbstractControl): ValidationErrors | null {
    if (this.liUsers) {
      if (control.value != null) {
        let user = this.liUsers.find(
          (e) => e.email.toUpperCase() === control.value.toUpperCase()
        );
        if (user !== undefined) {
          return { mailExist: true };
        }
      }
    }
    return null;
  }
}
