import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { PostModel } from 'src/app/models/PostModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private source = new BehaviorSubject<PostModel[]>([]);
  currentPosts = this.source.asObservable();

  sendOutPosts(posts: PostModel[]) {
    this.source.next(posts);
  }

  constructor() { }
}
