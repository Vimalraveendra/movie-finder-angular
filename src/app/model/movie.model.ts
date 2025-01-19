export interface IMovie{
    Poster:string,
    Title:string,
    Type:string
    Year:string,
     imdbID:string,
}

export interface IMovieList{
    Search:IMovie[],
    totalResults:string,
    Response:string,
    Error?:string,

}