import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const GithubApi = 'https://github-restapi-angular.herokuapp.com/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  constructor(private httpClient: HttpClient) { }

  getUser(username: string) {
    return this.httpClient.get<T>(`${GithubApi}/users/${username}`);
  }

  getFollowers(username: string, filter: {page: number, limit: number}) {
    return this.httpClient.get<T[]>(`${GithubApi}/users/${username}/followers?page=${filter.page}&&per_page=${filter.limit}`);
  }
}
