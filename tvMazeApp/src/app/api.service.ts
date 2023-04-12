import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Show } from './show';
import { SingleShow } from './single-show';
import { CastMember } from './cast';
import { Episode } from './episode';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  URL = 'https://api.tvmaze.com/search/shows?q=';
  showDetailsURL = 'https://api.tvmaze.com/shows/';
  castURL = '/cast';
  episodesURL = '/episodes';

  constructor(private http: HttpClient) {}

  getShowsRequest(searchQuery: string): Observable<Show[]> {
    return this.http
      .get<any[]>(this.URL + searchQuery)
      .pipe(
        map((json: any[]) =>
          json.map((item) => ({ show: item.show, score: item.score }))
        )
      );
  }

  getShowDetails(searchQuery: string): Observable<SingleShow> {
    return this.http.get<any>(this.showDetailsURL + searchQuery);
  }

  getShowCast(searchQuery: string): Observable<CastMember[]> {
    return this.http.get<any>(this.showDetailsURL + searchQuery + this.castURL);
  }

  getEpisodes(searchQuery: string): Observable<Episode[]> {
    return this.http.get<any>(
      this.showDetailsURL + searchQuery + this.episodesURL
    );
  }
}
