import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryModelV1} from 'src/app/models/CategoryModelV1';
import {PostService} from 'src/app/services/post/post.service';
import {DataService} from 'src/app/services/data/data.service';
import {CategoryService} from 'src/app/services/category/category.service';
import {CategoryModelV2} from "../../../models/CategoryModelV2";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryModalWindowComponent} from "../../category-modal-window/category-modal-window.component";
import JWTDecode from "jwt-decode";

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories-page.component.html',
    styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

    categories: CategoryModelV2[] = [];

    isLoad: boolean = false;

    constructor(
        private _router: Router,
        private _categoryService: CategoryService,
        private _postService: PostService,
        private _dataService: DataService,
        private _modalService: NgbModal) {
    }

    ngOnInit(): void {
        let token = localStorage.getItem("token");
        if (token !== null) {
            let tokenDecode: { role: string } = JWTDecode(token);
            if (tokenDecode.role === "admin") {
                this.getCategories();
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

    getCategories() {
        this._categoryService.getCategoriesAndCountByPostsForEachCategory()
            .subscribe(response => {
                console.dir(response);
                if (response.succeeded) {
                    this.categories = response.result;
                } else {
                    alert(response.message);
                }
            })
    }

    addCategory() {
        let modalRef = this._modalService.open(CategoryModalWindowComponent,
            {size: "lg"});
        modalRef.result.then(
            result => {
                console.log(result);
                if (result !== undefined) {
                    this._categoryService.addCategory(result)
                        .subscribe(response => {
                            if (response.succeeded){
                                  this.getCategories();
                            }
                            else{
                                alert(response.message);
                            }
                        })
                }
            }).catch(reason => {
        });
    }

    editCategory(category:CategoryModelV2, event:Event) {
        event.stopPropagation();
        let modalRef = this._modalService.open(CategoryModalWindowComponent,
            {size: "lg"});
        modalRef.componentInstance.currentName = category.name;
        modalRef.result.then(
            result => {
                if (result !== undefined) {
                    this._categoryService.editCategory(category.id, result).subscribe(
                        response => {
                            if (response.succeeded){
                                this.getCategories();
                            }
                            else{
                                alert(response.message);
                            }
                        }
                    )
                }
            }).catch(reason => {
        });
        this._categoryService.getCategoriesAndCountByPostsForEachCategory()
            .subscribe(response => {
                console.dir(response);
                if (response.succeeded) {
                    this.categories = response.result;
                } else {
                    alert(response.message);
                }
            })
    }

    deleteCategory(category:CategoryModelV2, event:Event) {
        event.stopPropagation();
        this._categoryService.deleteCategory(category.id)
            .subscribe(response => {
                if (response.succeeded) {
                    this.getCategories();
                } else {
                    alert(response.message);
                }
            })
    }


    goToPostsByCategory(category: CategoryModelV2) {
        this._postService.getPublishedPostsWhichVisibleAllByCategoryId(category.id)
            .subscribe(response => {
                console.dir(response);
                if (response.succeeded) {
                    this._dataService.sendOutPosts(response.result)
                } else {
                    alert(response.message);
                    this._router.navigate(
                        ['/']
                    );
                }

            });
        this._router.navigate(
            ['/posts']
        );
    }


    sortName() {
        this.categories.sort((a, b) => {
            if (a.name < b.name)
                return 1;
            if (a.name > b.name)
                return -1;
            return 0;
        });
    }

    sortQuantityPosts() {
        this.categories.sort((a, b) => {
            if (a.quantityPosts < b.quantityPosts)
                return 1;
            if (a.quantityPosts > b.quantityPosts)
                return -1;
            return 0;
        });
    }
}
