import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CastMember } from '../cast';
import { Episode } from '../episode';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  showDetails: any;
  cast: CastMember[] | undefined;
  episodes: Episode[] | undefined;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      forkJoin({
        showDetails: this.apiService.getShowDetails(param.get('id')!),
        cast: this.apiService.getShowCast(param.get('id')!),
        episodes: this.apiService.getEpisodes(param.get('id')!),
      }).subscribe((response) => {
        this.showDetails = response.showDetails;
        this.cast = response.cast;
        this.episodes = response.episodes;
        console.log(this.episodes[0].image?.medium);
        
      });
    });
  }
}
