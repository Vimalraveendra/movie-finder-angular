import { Component } from '@angular/core';

import { HeaderComponent } from "./header/header.component";
import { SearchMoviesComponent } from "./search-movies/search-movies.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SearchMoviesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-signals-reactive-form';
}
