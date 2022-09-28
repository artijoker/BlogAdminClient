import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../../models/PostModel";
import {PostService} from "../../../services/post/post.service";
import {DataService} from "../../../services/data/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pending-posts-page',
  templateUrl: './pending-posts-page.component.html',
  styleUrls: ['./pending-posts-page.component.css']
})
export class PendingPostsPageComponent implements OnInit {

    posts: PostModel[] = [];

    constructor(private _postService: PostService,
                private _dataService: DataService,
                private _router: Router) {
    }

    ngOnInit(): void {
        this.getPendingPosts()
    }

    getPendingPosts() {
        this._postService.getPendingPostsByAccount()
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
                    this.getPendingPosts();
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
                    this.getPendingPosts();
                } else {
                    alert(response.message);
                }
            })

    }

}
