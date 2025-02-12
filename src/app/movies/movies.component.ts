import { Component,inject } from '@angular/core';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  private movieService=inject(MovieService)
  moviesArray=this.movieService.allMoviesList;
}
