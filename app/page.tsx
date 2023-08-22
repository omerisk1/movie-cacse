"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/features/movie-slice";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchParam, setSearchParam] = useState<string>("");

  const dispatch = useDispatch();
  const movies = useSelector((state: any) => state.movies);
  const handleFecthMovies = () => {
    dispatch(fetchMovies(searchParam));
  };
  useEffect(() => {
    handleFecthMovies();
  }, [searchParam]);
  return (
    <>
      <div>
        {Object.keys(movies.data).length !== 0 &&
          movies.data?.Search?.map((movie: any, index: number) => {
            return <p key={index}>{movie.Title}</p>;
          })}
      </div>
      <div>
        <input
          type="text"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </div>
    </>
  );
}
