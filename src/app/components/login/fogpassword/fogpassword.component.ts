import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-fogpassword',
  templateUrl: './fogpassword.component.html',
  styleUrls: ['./fogpassword.component.css'],
})
export class FogpasswordComponent {
  validateForm: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private message: NzMessageService,
    private userService: UserService
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  goToPage(page: string) {
    this.router.navigate(['../' + page]);
  }
  onSubmit(): void {
    this.message.create('success', `Veuillez consulter vos e-mail`, {
      nzDuration: 5000,
    });
    this.userService
      .forgetpass(this.validateForm.value.email)
      .subscribe((res) => {
        console.log(res);
      });
    this.router.navigate(['../']);
  }
}
