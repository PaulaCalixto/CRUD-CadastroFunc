import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  mensagemLogin: string = "";

  constructor(private router: Router) {}

  btnLogin(): void {
    if (this.username === "admin" && this.password === "admin") {
      this.mensagemLogin = "Certo!";
      this.router.navigate(["home"]);
    } else {
      this.mensagemLogin = "Errado!";
    }
  }
}
