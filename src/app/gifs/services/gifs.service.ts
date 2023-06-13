import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {this.loadLocalStorage();
  }

  sidebarHeight: string = '100vh';

  private _tagsHistory: string[] = [];

  public gifsList: Gif[] = [];
  private apiKey: string = 'YGuGGYNQJxdEpRYuEUaa4u5xE8kX3vEa';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  get TagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('giphy', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('giphy')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('giphy')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string) {
    if (tag.length == 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      .subscribe((response) => {
        this.gifsList = response.data;
        this.sidebarHeight = '100%';
      });
  }
}
