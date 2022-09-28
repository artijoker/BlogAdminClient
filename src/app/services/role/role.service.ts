import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../responses/IResponse";
import {CategoryModelV1} from "../../models/CategoryModelV1";
import {RoleModel} from "../../models/RoleModel";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }


    getRoles(): Observable<IResponse<RoleModel[]>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<IResponse<RoleModel[]>>(
            this._host + "role/admin/get-roles",
            {headers:headers}
        );
    }
}
