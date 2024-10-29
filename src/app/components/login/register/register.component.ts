import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  validateForm: UntypedFormGroup;


  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Données envoyées :', this.validateForm.value); // Log pour déboguer
      this.userService.createUser(this.validateForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      
      });
    } else {
      console.error('Formulaire invalide:', this.validateForm.errors); // Log pour déboguer
    }
     

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
    setTimeout(() => this.validateForm.controls['confirm'].updateValueAndValidity());
  }


  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
 liUsers: User[] = [];
  constructor(private fb: UntypedFormBuilder,private userService: UserService,private router: Router,) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required,this.uniqueMail.bind(this)]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      groupe:['Client',[Validators.required]]

    });
  }
   ngOnInit(): void {
    this.userService.getuser().subscribe((data) => {
      this.liUsers = data;
    });
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
  goToPage(page: string) {
    this.router.navigate(['../' + page]);
  }
}
