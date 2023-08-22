import React, { lazy } from "react";
import { movie } from "../utils/types";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";

export default function MovieCard({ movie }: { movie: movie }) {
  return (
    <div className="card-container">
      <div className="card-image-container">
        <div
          className={`card-badge ${
            movie.Type === "movie"
              ? "orange"
              : movie.Type === "series"
              ? "green"
              : movie.Type === "episode"
              ? "blue"
              : "red"
          }`}
        >
          {movie.Type}
        </div>
        <img
          loading="lazy"
          src={movie.Poster}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://media.istockphoto.com/id/1179735330/vector/coming-soon-handwrite-title-on-closed-red-silky-luxury-theater-curtain-background-with.jpg?s=612x612&w=0&k=20&c=CRDaP4DkjZfI-oyAF-iNCjZm7Ny0twpmhojvR6Iybak=";
          }}
          alt="Movie Picture"
          className="card-image"
        />
      </div>

      <div className="movie-card-content">
        <p className="movie-card-title">{movie.Title}</p>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}
