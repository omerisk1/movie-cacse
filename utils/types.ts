export type searchParam = {
    search: string,
    year: number | null ,
    type: string
    page:number
}

export const years: number[] = [
    2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
    2018, 2019, 2020, 2021, 2022, 2023,
];
  
export const types: string[] = ["movie", "series", "episode"];

export type movie = {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID:string
}

export type detailMovie = {
    Title: string,
    Runtime: string,
    Type: string,
    Actors: string,
    imdbRating: string,
    Plot: string,
    Released: string,
    Countery: string
}