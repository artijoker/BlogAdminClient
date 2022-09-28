import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PostModel} from 'src/app/models/PostModel';
import {DataService} from 'src/app/services/data/data.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    isLoadPost: boolean = true;
    posts: PostModel[] = [];

    constructor(private _router: Router,
                private _dataService: DataService) {
    }

    ngOnInit(): void {
        this._dataService.currentPosts.subscribe(
            posts => {
                this.posts = posts.sort((a, b) => {
                    if (a.lastChange < b.lastChange)
                        return 1;
                    if (a.lastChange > b.lastChange)
                        return -1;
                    return 0;
                });
                this.isLoadPost = false;
            }
        )
    }

    goToPost(postId: number) {
        this._router.navigate(
            [this._router.url + '/post', postId]
        );
    }

    goToPostEditor(postId: number) {
        this._router.navigate(
            [this._router.url + '/edit-post', postId]
        );
    }

    sortTitle() {
        this.posts.sort((a, b) => {
            if (a.title > b.title)
                return 1;
            if (a.title < b.title)
                return -1;
            return 0;
        });
    }

    sortAuthor() {
        this.posts.sort((a, b) => {
            if (a.accountLogin > b.accountLogin)
                return 1;
            if (a.accountLogin < b.accountLogin)
                return -1;
            return 0;
        });
    }

    sortCategory() {
        this.posts.sort((a, b) => {
            if (a.categoryName > b.categoryName)
                return 1;
            if (a.categoryName < b.categoryName)
                return -1;
            return 0;
        });
    }

    sortDate() {
        this.posts.sort((a, b) => {
            if (a.lastChange < b.lastChange)
                return 1;
            if (a.lastChange > b.lastChange)
                return -1;
            return 0;
        });
    }
}
