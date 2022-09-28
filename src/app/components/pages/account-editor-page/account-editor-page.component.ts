import {Component, OnInit} from '@angular/core';
import {AccountModelV2} from "../../../models/AccountModelV2";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../services/account/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILogInResponse} from "../../../responses/authentication/ILogInResponse";
import {AccountModelV3} from "../../../models/AccountModelV3";
import {RoleModel} from "../../../models/RoleModel";
import {CategoryModelV1} from "../../../models/CategoryModelV1";
import {RoleService} from "../../../services/role/role.service";
import {Location} from "@angular/common";

@Component({
    selector: 'app-account-editor-page',
    templateUrl: './account-editor-page.component.html',
    styleUrls: ['./account-editor-page.component.css']
})
export class AccountEditorPageComponent implements OnInit {

    private readonly _id: number;

    form: FormGroup;
    accountMode?: AccountModelV3;
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
            "newPassword": new FormControl(""),
            "role": new FormControl()
        });
        this._id = this._activateRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this._roleService.getRoles().subscribe(
            response => {
                if (response.succeeded) {
                    this.roles = response.result;

                    if (this._id === undefined) {
                        this._accountService.getAccount()
                            .subscribe(response => {
                                if (response.succeeded) {
                                    this.accountMode = response.result;
                                    this.selectedRole = this.roles.filter(r => r.id === this.accountMode?.roleId)[0];
                                } else {
                                    alert(response.message);
                                }
                            })
                    }
                    else{
                        this._accountService.getAccountById(this._id)
                            .subscribe(response => {
                                if (response.succeeded) {
                                    this.accountMode = response.result;
                                    this.selectedRole = this.roles.filter(r => r.id === this.accountMode?.roleId)[0];
                                } else {
                                    alert(response.message);
                                }
                            })
                    }
                } else {
                    alert(response.message);
                }
            }
        )
    }

    onChange(role: RoleModel) {
        this.selectedRole = role;
    }

    submit() {
        if (this.form.valid && this.selectedRole) {
            let value = this.form.value;
            if (this.accountMode && this.selectedRole) {
                let email = value.email === "" ? this.accountMode!.email : value.email;
                let login = value.login === "" ? this.accountMode!.login : value.login;
                let newPassword = value.newPassword;
                this._accountService.updateAccount(
                    this.accountMode.id,
                    email,
                    login,
                    newPassword,
                    this.selectedRole.id)
                    .subscribe((response) => {
                        if (response.succeeded) {
                            this._location.back();
                        } else {
                            alert(response.message);
                        }
                    });
            }

        } else {
            if (!this.form.controls['email'].valid)
                alert("Невалидный  email!");
        }
    }

}
