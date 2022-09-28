import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountModelV2} from '../../models/AccountModelV2'

import {IResponse} from '../../responses/IResponse';
import {AccountModelV1} from "../../models/AccountModelV1";
import {AccountModelV3} from "../../models/AccountModelV3";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }

    getAuthorsAndQuantityPostsEachHas(): Observable<IResponse<AccountModelV3[]>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<IResponse<AccountModelV3[]>>(
            this._host + "account/admin/get-all-accounts-and-quantity-published-posts",
            {headers: headers});
    }

    getAccount(): Observable<IResponse<AccountModelV3>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<IResponse<AccountModelV3>>(this._host + "account/get-account",
            {headers: headers});
    }

    getAccountById(accountId:number): Observable<IResponse<AccountModelV3>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");
        return this._client.post<IResponse<AccountModelV3>>(
            this._host + "account/admin/get-account-by-id",
            accountId,
            {headers: headers});
    }

    addAccount(email: string, login: string, password: string, roleId: number)
        : Observable<IResponse<AccountModelV1>> {
        let body = {
            email: email,
            login: login,
            password: password,
            roleId: roleId
        }
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse<AccountModelV1>>(
            this._host + "account/admin/add-account", body, {headers: headers}
        );
    }

    updateAccount(accountId: number, email: string, login: string, newPassword: string, roleId: number)
        : Observable<IResponse<AccountModelV1>> {
        let body = {
            accountId: accountId,
            email: email,
            login: login,
            newPassword: newPassword,
            roleId: roleId
        }
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse<AccountModelV1>>(
            this._host + "account/admin/edit-account", body, {headers: headers}
        );
    }



    bannedAccount(accountId:number): Observable<IResponse> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");
        return this._client.post<IResponse>(this._host + "account/admin/banned-account",
            accountId,
            {headers: headers});
    }

    unlockAccount(accountId:number): Observable<IResponse> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");
        return this._client.post<IResponse>(this._host + "account/admin/unlock-account",
            accountId,
            {headers: headers});
    }

    deleteAccount(accountId:number): Observable<IResponse> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");
        return this._client.post<IResponse>(this._host + "account/admin/delete-account",
            accountId,
            {headers: headers});
    }
}
