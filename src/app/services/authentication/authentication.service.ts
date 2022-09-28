import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, Subject} from 'rxjs';
import {ILogInResponse} from 'src/app/responses/authentication/ILogInResponse';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private source = new BehaviorSubject<boolean>(false);
    authenticator = this.source.asObservable();

    authenticateAccount(value: boolean) {
        this.source.next(value);
    }

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }

    authorize(login: string, password: string): Observable<ILogInResponse> {
        return this._client.post<ILogInResponse>(this._host + "account/login", {
            login: login,
            password: password
        }).pipe(catchError(err => {
            alert(err.message);
            return [];
        }));
    }

    deauthorize(): Observable<Response> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<Response>(this._host + "account/deauthorize",
            {headers: headers});
    }

}
