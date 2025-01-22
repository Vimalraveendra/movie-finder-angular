import { Component,DestroyRef,inject,OnInit,signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../service/movie.service';

@Component({
    selector: 'app-search-movies',
    standalone:true,
    imports: [ReactiveFormsModule],
    templateUrl: './search-movies.component.html',
    styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent  implements OnInit{
  private movieService=inject(MovieService)
  private destroyRef=inject(DestroyRef)
  moviesArray=this.movieService.allMoviesList;
  isFetching=signal<boolean>(false)
  error=signal(' ')
  form = new FormGroup({
    searchText:new FormControl(' ',{
      validators:[Validators.required]
    })
  })
 
  ngOnInit(): void {
    this.form.valueChanges.subscribe({
      next:(value)=>{
         if(value && this.error()){
            this.error.set('')
         }
      }
    })
  }

  onSubmit(){
    let searchInput=this.form.value.searchText
    if(searchInput===' ' || searchInput===null|| searchInput===undefined){
         if(this.moviesArray()){
             this.movieService.resetLoadMovies();
         }
      this.error.set("Kindly enter a valid movie name")
      return ;
    }
    this.isFetching.set(true)
    const subscription=this.movieService.loadMoviesList(searchInput?.trim()). subscribe({
      error:(error:Error)=>{
        console.log("error",error)
        console.log(this.form)  
        this.error.set(error.message)
     },
     complete:()=>{
       this.isFetching.set(false)
     }
    })
     this.destroyRef.onDestroy(()=>subscription.unsubscribe())
     this.form.reset()
  }
}
