import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsPageComponent} from './components/pages/accounts-page/accounts-page.component';
import {BlogPageComponent} from './components/pages/blog-page/blog-page.component';
import {CategoriesPageComponent} from './components/pages/categories-page/categories-page.component';
import {SingInPageComponent} from './components/pages/sing-in-page/sing-in-page.component';
import {PostDetailsPageComponent} from './components/pages/post-details-page/post-details-page.component';
import {PostEditorPageComponent} from './components/pages/post-editor-page/post-editor-page.component';
import {PostsComponent} from './components/posts/posts.component';
import {AddPostPageComponent} from "./components/pages/add-post-page/add-post-page.component";
import {ProfilePageComponent} from "./components/pages/profile-page/profile-page.component";
import {AccountEditorPageComponent} from "./components/pages/account-editor-page/account-editor-page.component";
import {AddAccountPageComponent} from "./components/pages/add-account-page/add-account-page.component";
import {DraftPostsPageComponent} from "./components/pages/draft-posts-page/draft-posts-page.component";
import {PublishedPostsPageComponent} from "./components/pages/published-posts-page/published-posts-page.component";
import {RejectedPostsPageComponent} from "./components/pages/rejected-posts-page/rejected-posts-page.component";
import {PendingPostsPageComponent} from "./components/pages/pending-posts-page/pending-posts-page.component";

const routes: Routes = [
    {path: '', redirectTo: '/sing-in', pathMatch: 'full'},
    {path: 'sing-in', component: SingInPageComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'accounts', component: AccountsPageComponent},
    {path: 'add-account', component: AddAccountPageComponent},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'add-post', component: AddPostPageComponent},
    {path: 'my-profile', component: ProfilePageComponent},

    {path: 'posts', component: PostsComponent},
    {path: 'posts/post/:id', component: PostDetailsPageComponent},
    {path: 'posts/edit-post/:id', component: PostEditorPageComponent},
    {path: 'posts/post/:id/edit-post/:id', component: PostEditorPageComponent},

    {path: 'blog/post/:id', component: PostDetailsPageComponent},
    {path: 'blog/edit-post/:id', component: PostEditorPageComponent},
    {path: 'blog/post/:id/edit-post/:id', component: PostEditorPageComponent},

    {path: 'accounts/edit-account/:id', component: AccountEditorPageComponent},
    {path: 'my-profile/edit-account/:id', component: AccountEditorPageComponent},

    {path: 'my-posts', redirectTo: '/my-posts/draft-posts', pathMatch: 'full'},

    {path: 'my-posts/draft-posts', component: DraftPostsPageComponent},
    {path: 'my-posts/draft-posts/edit-post/:id', component: PostEditorPageComponent},
    {path: 'my-posts/draft-posts/post/:id', component: PostDetailsPageComponent},
    {path: 'my-posts/draft-posts/post/:id/edit-post/:id', component: PostEditorPageComponent},

    {path: 'my-posts/published-posts', component: PublishedPostsPageComponent},
    {path: 'my-posts/published-posts/edit-post/:id', component: PostEditorPageComponent},
    {path: 'my-posts/published-posts/post/:id', component: PostDetailsPageComponent},
    {path: 'my-posts/published-posts/post/:id/edit-post/:id', component: PostEditorPageComponent},

    {path: 'my-posts/pending-posts', component: PendingPostsPageComponent},
    {path: 'my-posts/pending-posts/edit-post/:id', component: PostEditorPageComponent},
    {path: 'my-posts/pending-posts/post/:id', component: PostDetailsPageComponent},
    {path: 'my-posts/pending-posts/post/:id/edit-post/:id', component: PostEditorPageComponent},

    {path: 'my-posts/rejected-posts', component: RejectedPostsPageComponent},
    {path: 'my-posts/rejected-posts/edit-post/:id', component: PostEditorPageComponent},
    {path: 'my-posts/rejected-posts/post/:id', component: PostDetailsPageComponent},
    {path: 'my-posts/rejected-posts/post/:id/edit-post/:id', component: PostEditorPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
