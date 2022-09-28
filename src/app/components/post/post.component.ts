import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/PostModel';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	@Input() post?: PostModel

	constructor(private _router: Router) {
	}

	ngOnInit(): void {
	}

	goToPost(){
        this._router.navigate(
            [this._router.url + '/post', this.post?.id]
        );
    }
}
