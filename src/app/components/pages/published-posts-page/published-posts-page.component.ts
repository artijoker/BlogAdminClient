import {Component, OnInit} from '@angular/core';
import {PostModel} from "../../../models/PostModel";
import {PostService} from "../../../services/post/post.service";
import {DataService} from "../../../services/data/data.service";
import {Router} from "@angular/router";
import {PostStatus} from "../../../PostStatus";

@Component({
    selector: 'app-published-posts-page',
    templateUrl: './published-posts-page.component.html',
    styleUrls: ['./published-posts-page.component.css']
})
export class PublishedPostsPageComponent implements OnInit {

    posts: PostModel[] = [];

    constructor(private _postService: PostService,
                private _dataService: DataService,
                private _router: Router) {
    }

    ngOnInit(): void {
        this.getPublishedPosts()
    }

    getPublishedPosts() {
        this._postService.getPublishedPostsByAccount()
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
    sendPostToDraft(postId: number, event:Event) {
        event.stopPropagation();
        this._postService.sendPostToDraft(postId)
            .subscribe(response => {
                if (response.succeeded) {
                    alert("Статья перемещена в черновики");
                    this.getPublishedPosts();
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
                    this.getPublishedPosts();
                } else {
                    alert(response.message);
                }
            })

    }
}
