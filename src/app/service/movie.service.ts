import { HttpClient } from '@angular/common/http';
import { inject, Injectable,signal } from '@angular/core';
import { tap,catchError,throwError } from 'rxjs';
import { IMovie,IMovieList } from '../model/movie.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private httpClient= inject(HttpClient)
  moviesList=signal<IMovie[]>([])
  allMoviesList = this.moviesList.asReadonly();

  loadMoviesList(searchInput:string){
    return this.httpClient.get<IMovieList>(`http://www.omdbapi.com/?s=${searchInput}&apikey=${environment.APP_API_KEY}`)
    .pipe(tap({
      next:(movies)=>{
        if(movies.Response==='True'){
          this.moviesList.set(movies.Search)
        }else{
          this.resetLoadMovies(); 
          throw new Error(movies.Error)
        }
      }
    }),catchError((error:Error)=>{
      return throwError(()=>error)
}),
  ) }

  resetLoadMovies(){
    return this.moviesList.set([])
  }
}
