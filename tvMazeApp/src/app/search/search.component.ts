import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Show } from '../show';
import { SingleShow } from '../single-show';
import { debounceTime, switchMap, of, distinctUntilChanged } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThemeService } from '../theme.service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export default class SearchComponent {
  searchForm: FormGroup;
  shows: Show[] = [];
  singleShow: SingleShow | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    protected themeService: ThemeService,
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: [''],
    });
  }

  onSearch() {
    this.searchForm
      ?.get('searchQuery')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchQuery: string) => {
          if (searchQuery && searchQuery.length > 2) {
            return this.apiService.getShowsRequest(searchQuery);
          } else {
            return of([]);
          }
        })
      )
      .subscribe((shows: Show[]) => {
        this.shows = shows;
      });
  }

  showDetails(showId: number) {
    this.router.navigate(['/details'], { state: { showId } });
  }
}
