import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostModel} from 'src/app/models/PostModel';
import {PostService} from 'src/app/services/post/post.service';
import {AccountService} from "../../../services/account/account.service";
import {Location} from '@angular/common';
import {PostStatus} from "../../../PostStatus";
import {DataService} from "../../../services/data/data.service";

@Component({
    selector: 'app-post-details-page',
    templateUrl: './post-details-page.component.html',
    styleUrls: ['./post-details-page.component.css']
})
export class PostDetailsPageComponent implements OnInit {

    post?: PostModel;
    id: number;
    status?: PostStatus;
    postStatus: typeof PostStatus = PostStatus;

    date:string = "";
    constructor(private _activateRoute: ActivatedRoute,
                private _router: Router,
                private _location: Location,
                private _postService: PostService,
                private _accountService: AccountService,
                private _dataService: DataService) {
        this.id = this._activateRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this._postService.getPost(this.id)
            .subscribe(response => {
                if (response.succeeded) {
                    this.post = response.result;
                    this.status = this.post.status as PostStatus;
                    this.date =  this.post?.lastChange.toLocaleString("ru")
                } else {
                    alert(response.message);
                }
            })

    }

    goToPostsByAccountId() {
        if (this.post !== undefined) {
            this._postService.getPublishedPostsWhichVisibleAllByAccountId(this.post?.accountId)
                .subscribe(response => {
                    if (response.succeeded) {
                        this._dataService.sendOutPosts(response.result)
                    } else {
                        alert(response.message);
                    }
                });

            this._router.navigate(
                ['/posts']
            );
        }

    }

    goToPostEditor() {
        if (this.post !== undefined) {
            this._router.navigate(
                [this._router.url + '/edit-post', this.post?.id]
            );
        }
    }

    rejectPost() {
        if (this.post !== undefined) {
            this._postService.rejectPost(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Статья отклонена");
                        this._location.back();
                    } else {
                        alert(response.message);
                    }
                })
        }

    }

    publishPost() {
        if (this.post !== undefined) {
            this._postService.publishPost(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Статья опубликована");
                        this._location.back();
                    } else {
                        alert(response.message);
                    }
                })
        }
    }

    deletePost() {
        if (this.post !== undefined) {
            this._postService.removePost(this.post?.id)
                .subscribe(response => {
                    if (response.succeeded) {
                        alert("Статья удалена");
                        this._location.back();
                    } else {
                        alert(response.message);
                    }
                })
        }
    }
}
