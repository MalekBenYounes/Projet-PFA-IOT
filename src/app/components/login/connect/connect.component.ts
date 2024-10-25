import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css'],
})
export class ConnectComponent {
  constructor(private router: Router, private userService: UserService) {}
  message: string = '';

  username: string = '';
  pass: string = '';

  onSubmit(): void {
    this.userService.login(this.username, this.pass).subscribe(
     { next:(res) => {
        const token = res.token;
        const user=res.user;
        localStorage.setItem('token', token);
        localStorage.setItem('groupe', user.groupe);
        console.log(token);
        if (user.groupe=='Client')
        {
          this.router.navigate(['/dashboard/client']);
        }else if (user.groupe=='Financier'){

          this.router.navigate(['/dashboard/history']);
        }else {
          this.router.navigate(['/dashboard/parking']);
        }
      },
      error:(err) => {
        console.error(err.error);
        const errorMessage = err.error.message;
        this.message = errorMessage;
      }}
    );
  }
  goToPage(page: string) {
    this.router.navigate(['/' + page]);
  }
}
