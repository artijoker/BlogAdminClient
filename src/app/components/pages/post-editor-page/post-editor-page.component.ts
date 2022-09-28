import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {CategoryModelV1} from "../../../models/CategoryModelV1";
import {PostService} from "../../../services/post/post.service";
import {CategoryService} from "../../../services/category/category.service";
import {PostModel} from "../../../models/PostModel";

@Component({
    selector: 'app-post-editor-page',
    templateUrl: './post-editor-page.component.html',
    styleUrls: ['./post-editor-page.component.css']
})
export class PostEditorPageComponent implements OnInit {

    private _post?: PostModel;
    private _id: number;

    title: string = "";
    anons: string = "";
    htmlContent: string = "";
    categories: CategoryModelV1[] = [];
    selectedCategory?: CategoryModelV1;

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        sanitize: false,
        height: "28rem",
        minHeight: "15rem",
        placeholder: "Введите текст здесь...",
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [['insertImage', 'insertVideo', 'customClasses']]
    };

    constructor(private _activateRoute: ActivatedRoute,
                private _router: Router,
                private _location: Location,
                private _postService: PostService,
                private _categoryService: CategoryService) {
        this._id = this._activateRoute.snapshot.params['id']
    }

    ngOnInit(): void {
        this._postService.getPost(this._id)
            .subscribe(response => {
                if (response.succeeded) {
                    this._post = response.result
                    this.title = this._post.title;
                    this.anons = this._post.anons;
                    this.htmlContent = this._post.fullText;
                    this._categoryService.getCategories()
                        .subscribe(response => {
                            if (response.succeeded) {
                                this.categories = response.result;
                                this.selectedCategory = this.categories.filter(c => c.id === this._post?.categoryId)[0];
                            } else {
                                alert(response.message);
                            }
                        })


                } else {
                    alert(response.message);
                }
            })
    }


    onChange(category: CategoryModelV1) {
        this.selectedCategory = category;
    }

    isValid() {
        return this.title != "" && this.anons != "" && this.selectedCategory && this.htmlContent !== "";
    }

    showInvalidField() {
        if (this.title === "")
            alert("Пустой заголовок");
        else if (this.anons === "")
            alert("Пустой анонс");
        else if (!this.selectedCategory)
            alert("Выберите категорию");
        else if (this.htmlContent === "")
            alert("Пустой текст статьи");
    }

    save() {
        if (this.isValid()) {
            if (this._post?.id)
                this._postService.updatePost(this._post?.id,
                    this.title, this.anons,
                    this.htmlContent,
                    this.selectedCategory!.id)
                    .subscribe(response => {
                        if (response.succeeded) {
                            alert("Статья сохранена");
                            this._location.back();
                        } else {
                            alert(response.message);
                        }
                    });
            else {
                alert("Ошибка! Не удалось сохранить изменения");
            }
        } else {
            this.showInvalidField();
        }
    }

    cancel() {
        this._location.back();
    }


}
