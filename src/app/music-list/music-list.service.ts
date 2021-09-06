import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicList } from './music-list';
import { from } from 'rxjs'; 
import { map, publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicListService {

  iTunesUrl = 'https://itunes.apple.com/search'; 
  musicList: Observable<MusicList[]> | undefined;

  constructor(private httpClient: HttpClient) { }

  getMusicList(queryString: any): Observable<MusicList[]> {
    
      if (!this.musicList) {
        this.musicList = this.httpClient.get<MusicList[]>(`${this.iTunesUrl}?term=${queryString}`).pipe(
          publishReplay(1),
          refCount()
        );  
      }
      return this.musicList;
  
  }

  clearCache() {
    this.musicList = undefined;
  }
}
