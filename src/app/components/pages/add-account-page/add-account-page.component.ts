import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountModelV3} from "../../../models/AccountModelV3";
import {RoleModel} from "../../../models/RoleModel";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AccountService} from "../../../services/account/account.service";
import {RoleService} from "../../../services/role/role.service";
import JWTDecode from "jwt-decode";

@Component({
  selector: 'app-add-account-page',
  templateUrl: './add-account-page.component.html',
  styleUrls: ['./add-account-page.component.css']
})
export class AddAccountPageComponent implements OnInit {

    form: FormGroup;
    roles: RoleModel[] = [];
    selectedRole?: RoleModel;

    constructor(private _activateRoute: ActivatedRoute,
                private _router: Router,
                private _location: Location,
                private _accountService: AccountService,
                private _roleService: RoleService) {
        this.form = new FormGroup({
            "email": new FormControl("", Validators.email),
            "login": new FormControl(""),
            "password": new FormControl(""),
            "role": new FormControl()
        });
    }

    ngOnInit(): void {
        let token = localStorage.getItem("token");
        if (token !== null) {
            let tokenDecode: { role: string } = JWTDecode(token);
            if (tokenDecode.role === "admin") {
                this._roleService.getRoles().subscribe(
                    response => {
                        if (response.succeeded) {
                            this.roles = response.result;
                        } else {
                            alert(response.message);
                        }
                    }
                )
            }
            else
                this._router.navigate(
                    ['/']
                );
        } else {
            this._router.navigate(
                ['/']
            );
        }


    }

    onChange(role: RoleModel) {
        this.selectedRole = role;
    }

    submit() {
        if (this.form.valid && this.selectedRole) {
            let value = this.form.value;
            this._accountService.addAccount(
                value.email,
                value.login,
                value.password,
                this.selectedRole.id)
                .subscribe((response) => {
                    if (response.succeeded) {
                        this._location.back();
                    } else {
                        alert(response.message);
                    }
                });

        } else {
            if (!this.form.controls['email'].valid)
                alert("Невалидный  email!");
        }

    }
    cancel() {
        this._location.back();
    }
}
