import {Component, OnInit} from '@angular/core';
import {PostStatus} from "../../../PostStatus";
import {PostService} from "../../../services/post/post.service";
import {DataService} from "../../../services/data/data.service";
import {Router} from "@angular/router";
import {PostModel} from "../../../models/PostModel";

@Component({
    selector: 'app-draft-posts-page',
    templateUrl: './draft-posts-page.component.html',
    styleUrls: ['./draft-posts-page.component.css']
})
export class DraftPostsPageComponent implements OnInit {

    posts: PostModel[] = [];

    constructor(private _postService: PostService,
                private _dataService: DataService,
                private _router: Router) {
    }

    ngOnInit(): void {
        this.getDraftPosts()
    }

    getDraftPosts() {
        this._postService.getDraftPostsByAccount()
            .subscribe(response => {
                if (response.succeeded) {
                    this.posts = response.result.sort((a, b) => {
                        if (a.lastChange < b.lastChange)
                            return 1;
                        if (a.lastChange > b.lastChange)
                            return -1;
                        return 0;
                    });
                } else {
                    alert(response.message);
                }
            });
    }

    goToPost(postId: number) {
        this._router.navigate(
            [this._router.url + '/post', postId]
        );
    }

    editPost(postId: number) {
        this._router.navigate(
            [this._router.url + '/edit-post', postId]
        );

    }

    publishPost(postId: number, event:Event) {
        event.stopPropagation();
        this._postService.publishPost(postId)
            .subscribe(response => {
                if (response.succeeded) {
                    alert("Статья опубликована");
                    this.getDraftPosts();
                } else {
                    alert(response.message);
                }
            })

    }

    deletePost(postId: number, event:Event) {
        event.stopPropagation();
        this._postService.removePost(postId)
            .subscribe(response => {
                if (response.succeeded) {
                    alert("Статья удалена");
                    this.getDraftPosts();
                } else {
                    alert(response.message);
                }
            })

    }
}
