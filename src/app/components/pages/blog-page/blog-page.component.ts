import {Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data/data.service';
import {PostService} from 'src/app/services/post/post.service';
import {CategoryService} from 'src/app/services/category/category.service';
import {CategoryModelV1} from 'src/app/models/CategoryModelV1';
import JWTDecode from "jwt-decode";
import {Router} from "@angular/router";

@Component({
    selector: 'app-blog',
    templateUrl: './blog-page.component.html',
    styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

    constructor(private _router: Router,
                private _postService: PostService,
                private _dataService: DataService) {
    }

    ngOnInit(): void {

        let token = localStorage.getItem("token");
        if (token !== null) {
            let tokenDecode: { role: string } = JWTDecode(token);
            if (tokenDecode.role === "admin") {
                this.getPublishedPosts();
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

    getPublishedPosts() {
        this._postService.getPublishedPosts()
            .subscribe(response => {
                if (response.succeeded) {
                    this._dataService.sendOutPosts(response.result);
                } else {
                    alert(response.message);
                }
            });
    }

    getPendingPosts() {
        this._postService.getPendingPosts()
            .subscribe(response => {
                if (response.succeeded) {
                    this._dataService.sendOutPosts(response.result);
                } else {
                    alert(response.message);
                }
            });
    }
}


