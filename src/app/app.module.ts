import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {CommentComponent} from './components/comment/comment.component';
import {PostComponent} from './components/post/post.component';
import {PostDetailsPageComponent} from './components/pages/post-details-page/post-details-page.component';

import {CommentEditorComponent} from './components/comment-editor/comment-editor.component';
import {AccountEditorPageComponent} from './components/pages/account-editor-page/account-editor-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommentsComponent} from './components/comments/comments.component';
import {PostsComponent} from './components/posts/posts.component';

import {SingInPageComponent} from './components/pages/sing-in-page/sing-in-page.component';
import {BlogPageComponent} from './components/pages/blog-page/blog-page.component';
import {AccountsPageComponent} from './components/pages/accounts-page/accounts-page.component';
import {CategoriesPageComponent} from './components/pages/categories-page/categories-page.component';
import {AddPostPageComponent} from './components/pages/add-post-page/add-post-page.component';
import {PostEditorPageComponent} from './components/pages/post-editor-page/post-editor-page.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {ProfilePageComponent} from './components/pages/profile-page/profile-page.component';
import {AddAccountPageComponent} from './components/pages/add-account-page/add-account-page.component';
import {CategoryModalWindowComponent} from './components/category-modal-window/category-modal-window.component';
import { DraftPostsPageComponent } from './components/pages/draft-posts-page/draft-posts-page.component';
import { PublishedPostsPageComponent } from './components/pages/published-posts-page/published-posts-page.component';
import { RejectedPostsPageComponent } from './components/pages/rejected-posts-page/rejected-posts-page.component';
import {PendingPostsPageComponent} from "./components/pages/pending-posts-page/pending-posts-page.component";

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu, 'ru');

@NgModule({
    declarations: [
        AppComponent,
        CommentComponent,
        PostComponent,
        PostDetailsPageComponent,
        PostEditorPageComponent,
        CommentEditorComponent,
        AccountEditorPageComponent,
        BlogPageComponent,
        SingInPageComponent,
        CommentsComponent,
        AccountsPageComponent,
        PostsComponent,
        CategoriesPageComponent,
        AddPostPageComponent,
        SafeHtmlPipe,
        ProfilePageComponent,
        AddAccountPageComponent,
        CategoryModalWindowComponent,
        DraftPostsPageComponent,
        PublishedPostsPageComponent,
        RejectedPostsPageComponent,
        PendingPostsPageComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        AngularEditorModule,

    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'ru'},
        {provide: 'HOST_URL', useValue: "https://localhost:7299/"}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
