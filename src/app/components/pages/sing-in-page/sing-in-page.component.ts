import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ILogInResponse} from 'src/app/responses/authentication/ILogInResponse';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import jwt_decode, {JwtPayload} from 'jwt-decode';

@Component({
    selector: 'app-sing-in-page',
    templateUrl: './sing-in-page.component.html',
    styleUrls: ['./sing-in-page.component.css']
})
export class SingInPageComponent implements OnInit {

    formSingIn: FormGroup;


    constructor(private _router: Router,
                private _authenticationService: AuthenticationService) {

        this.formSingIn = new FormGroup({
            "login": new FormControl("", Validators.required),
            "password": new FormControl("", Validators.required)
        });
    }

    ngOnInit(): void {
        let token = localStorage.getItem("token");
        if (token !== null) {
            let tokenDecode: { role: string } = jwt_decode(token);
            if (tokenDecode.role === "admin"){
                this._authenticationService.authenticateAccount(true);
                this._router.navigate(
                    ['/blog']
                );
            }
        }

    }

    submit() {
        if (this.formSingIn.valid) {
            let value = this.formSingIn.value;
            this._authenticationService.authorize(value.login, value.password)
                .subscribe((response: ILogInResponse) => {
                    console.dir(response);
                    if (response.succeeded) {
                        let tokenDecode: { role: string } = jwt_decode(response.token);
                        if (tokenDecode.role === "admin"){
                            localStorage.setItem("token", response.token);
                            this._authenticationService.authenticateAccount(true);
                            this._router.navigate(
                                ['/blog']
                            );
                        }
                        else{
                            alert("Ошибка авторизации! Выполните вход с помощью учетной записи администратора");
                            this._router.navigate(
                                ['/']
                            );
                        }

                    } else {
                        alert(response.message);
                    }
                });
        } else {
            if (!this.formSingIn.controls['login'].valid)
                alert("Введите логин!");
            else
                alert("Введите пароль!");

        }
    }

}
