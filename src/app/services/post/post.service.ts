import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {PostModel} from '../../models/PostModel';
import {AccountModelV2} from '../../models/AccountModelV2'
import {CategoryModelV1} from '../../models/CategoryModelV1';
import {IResponse} from '../../responses/IResponse';

@Injectable({
    providedIn: 'root'
})

export class PostService {

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }


    getPublishedPosts(): Observable<IResponse<PostModel[]>> {
        return this._client.get<IResponse<PostModel[]>>(this._host + "posts/get-posts");
    }

    getPendingPosts(): Observable<IResponse<PostModel[]>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<IResponse<PostModel[]>>(this._host + "posts/admin/get-pending-posts",
            {headers: headers}
        );
    }




    getPublishedPostsWhichVisibleAllByAccountId(accountId: number): Observable<IResponse<PostModel[]>> {
        let headers = new HttpHeaders().set('content-type', 'application/json');
        return this._client.post<IResponse<PostModel[]>>(
            this._host + "posts/get-posts-by-accountId", accountId, {headers: headers});
    }

    getPublishedPostsWhichVisibleAllByCategoryId(categoryId: number): Observable<IResponse<PostModel[]>> {
        let headers = new HttpHeaders().set('content-type', 'application/json');
        return this._client.post<IResponse<PostModel[]>>(
            this._host + "posts/get-posts-by-categoryId", categoryId, {headers: headers});
    }


    getPost(postId: number): Observable<IResponse<PostModel>> {
        let headers = new HttpHeaders().set('content-type', 'application/json');
        return this._client.post<IResponse<PostModel>>(
            this._host + "posts/get-post", postId, {headers: headers});
    }

    getSpecificRecentNumberPosts(number: number): Observable<IResponse<PostModel[]>> {
        let headers = new HttpHeaders().set('content-type', 'application/json');
        return this._client.post<IResponse<PostModel[]>>(
            this._host + "posts/get-recent-posts", number, {headers: headers});
    }

    getPublishedPostsByAccount(): Observable<IResponse<PostModel[]>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<IResponse<PostModel[]>>(
            this._host + "posts/get-published-posts-by-accountId", {headers: headers});
    }

    getDraftPostsByAccount(): Observable<IResponse<PostModel[]>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<IResponse<PostModel[]>>(
            this._host + "posts/get-draft-posts-by-accountId", {headers: headers});
    }

    getPendingPostsByAccount(): Observable<IResponse<PostModel[]>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<IResponse<PostModel[]>>(
            this._host + "posts/get-pending-posts-by-accountId", {headers: headers});
    }

    getRejectedPostsByAccount(): Observable<IResponse<PostModel[]>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<IResponse<PostModel[]>>(
            this._host + "posts/get-rejected-posts-by-accountId", {headers: headers});
    }



    addNewPost(title: string, anons: string, fullText: string, categoryId: number): Observable<IResponse> {
        let body = {
            title: title,
            anons: anons,
            fullText: fullText,
            categoryId: categoryId

        };

        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse>(this._host + "posts/add-post",
            body, {headers: headers}
        );
    }

    addPostAndPublished(title: string, anons: string, fullText: string, categoryId: number): Observable<IResponse> {
        let body = {
            title: title,
            anons: anons,
            fullText: fullText,
            categoryId: categoryId

        };

        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse>(this._host + "posts/admin/add-post-and-published",
            body, {headers: headers}
        );
    }

    updatePost(postId: number, title: string, anons: string, fullText: string, categoryId: number): Observable<IResponse<Object>> {
        let body = {
            postId: postId,
            title: title,
            anons: anons,
            fullText: fullText,
            categoryId: categoryId

        };

        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse>(this._host + "posts/admin/update-post",
            body, {headers: headers});
    }

    removePost(postId: number): Observable<IResponse> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse>(this._host + "posts/delete-post",
            postId, {headers: headers});
    }


    publishPost(postId: number): Observable<IResponse> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse>(this._host + "posts/publish-post",
            postId, {headers: headers});
    }

    rejectPost(postId: number): Observable<IResponse> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse>(this._host + "posts/reject-post",
            postId, {headers: headers});
    }

    sendPostToDraft(postId: number): Observable<IResponse> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse>(this._host + "posts/send-post-to-draft",
            postId, {headers: headers});
    }


}
