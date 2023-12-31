import MovieDetailCard from "@/components/MovieDetailCard";
import "../../app/globals.scss";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { detailMovie } from "../../utils/types";

export default function MovieDetail() {
  const pathname = usePathname();
  const id = pathname ? pathname.substring(7) : null;

  const [movieData, setMovieData] = useState<detailMovie>();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}`)
        .then((response) => {
          setMovieData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    }
  }, [id]);

  return <MovieDetailCard data={movieData} />;
}
