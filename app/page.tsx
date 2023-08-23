"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/features/movie-slice";
import { useEffect, useState } from "react";
import { searchParam, years, types } from "../utils/types";
import { movie } from "../utils/types";
import "bootstrap/dist/css/bootstrap.min.css";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MovieCard from "@/components/MovieCard";
import { Container, Row, Col } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export default function Home() {
  const movies = useSelector((state: any) => state.movies);
  const dispatch = useDispatch();
  const router = useRouter();

  const [searchParam, setSearchParam] = useState<searchParam>({
    search: "",
    year: null,
    type: "",
    page: 1,
  });

  const handleChange = (key: string, value: string | number) => {
    setSearchParam({ ...searchParam, [key]: value });
  };

  const handlePageChange = (event: any, newPage: number) => {
    setSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      page: newPage,
    }));
  };

  useEffect(() => {
    dispatch(fetchMovies(searchParam));
  }, [searchParam]);

  const pageCount =
    movies?.data.totalResults !== undefined
      ? Math.ceil(movies?.data.totalResults / 10)
      : 0;

  return (
    <>
      <Container>
        <Row className="mt-5 search-area">
          <Col className="search-comp">
            <img src="s-logo.png" alt="search-logo" className="s-logo" />
            <Input
              type="text"
              style={{ border: "2px solid #000" }}
              value={searchParam.search}
              placeholder="Film ara.."
              onChange={(e) =>
                setSearchParam({ ...searchParam, search: e.target.value })
              }
              className="rounded-lg px-4"
            />
          </Col>

          <Col className="select-area">
            <FormControl sx={{ m: 1, minWidth: 75 }}>
              <InputLabel id="demo-simple-select-helper-label">Tür</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchParam.type}
                label="Type"
                onChange={(e) => handleChange("type", e.target.value)}
              >
                {types.length > 0 &&
                  types.map((type: string, key: number) => (
                    <MenuItem value={type} key={key}>
                      {type}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 75 }}>
              <InputLabel id="demo-simple-select-helper-label">Yıl</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={String(searchParam.year)}
                label="Years"
                onChange={(e) => handleChange("year", Number(e.target.value))}
              >
                {years.length > 0 &&
                  years.map((year: number, key: number) => (
                    <MenuItem value={year} key={key}>
                      {year}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Col>
        </Row>
        {movies.loading && (
          <div className="loading-circle">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        )}
        {movies.data.Error && !movies.loading ? (
          <div className="error-message">
            Aradığınız sonuç bulunamadı veya çok fazla veri bulunuyor.
          </div>
        ) : (
          <Row className="mt-5">
            {Object.keys(movies.data).length !== 0 &&
              movies.data?.Search?.map((movie: movie) => {
                return (
                  <Col
                    key={movie.imdbID}
                    lg={4}
                    md={6}
                    sm={12}
                    className="movie-card"
                    onClick={() => router.push(`movie/${movie.imdbID}`)}
                  >
                    <MovieCard movie={movie} />
                  </Col>
                );
              })}
          </Row>
        )}
        {movies.data.Error && !movies.loading ? (
          ""
        ) : (
          <Row className="mt-5 mb-5 pagination-area">
            <Stack spacing={2}>
              <Pagination
                count={pageCount}
                color="primary"
                onChange={handlePageChange}
                page={searchParam.page}
              />
            </Stack>
          </Row>
        )}
      </Container>
    </>
  );
}
