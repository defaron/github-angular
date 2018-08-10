import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../node_modules/@angular/forms';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Github Angular';

  searchForm: FormGroup;
  submitted = false;

  currentUser: Observable<User>;
  followers: User[] = [];

  pageNumber: number;
  readonly pageLimit: number = 10;

  constructor(private apiService: ApiService<User>) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchText: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;

    const username = this.searchForm.controls['searchText'].value;

    this.followers = [];
    this.pageNumber = 1;

    this.currentUser = this.apiService.getUser(username);

    this.apiService.getFollowers(username, {page: this.pageNumber, limit: this.pageLimit})
      .subscribe(followers => {
        this.followers = followers;
      });
  }

  loadMore(username: string) {
    this.pageNumber ++;
    this.apiService.getFollowers(username, {page: this.pageNumber, limit: this.pageLimit})
      .subscribe(followers => {
        this.followers = this.followers.concat(followers);
      });

  }
}

export interface User {
  id: number;
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  created_at: string;
}
