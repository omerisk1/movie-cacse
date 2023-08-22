"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/features/movie-slice";
import { useEffect, useState } from "react";
import { searchParam } from "../utils/types";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, FormControlLabel, InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const years: number[] = [
  2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
  2018, 2019, 2020, 2021, 2022, 2023,
];

const types: string[] = ["movie", "series", "episode"];

export default function Home() {
  const movies = useSelector((state: any) => state.movies);
  const dispatch = useDispatch();

  const [searchParam, setSearchParam] = useState<searchParam>({
    search: "",
    year: null,
    type: "",
    page: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (key: string, value: string | number) => {
    setSearchParam({ ...searchParam, [key]: value });
  };

  const handlePageChange = (event: any, newPage: number) => {
    setSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      page: newPage,
    }));
    console.log("Şu anki sayfa:", newPage);
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
      <div>
        {Object.keys(movies.data).length !== 0 &&
          movies.data?.Search?.map((movie: any, index: number) => {
            return <p key={index}>{movie.Title}</p>;
          })}
      </div>
      <div>
        <Input
          type="text"
          style={{ border: "2px solid #000" }}
          value={searchParam.search}
          onChange={(e) =>
            setSearchParam({ ...searchParam, search: e.target.value })
          }
        />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
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
        <Stack spacing={2}>
          <Pagination
            count={pageCount}
            color="primary"
            onChange={handlePageChange}
            page={searchParam.page}
          />
        </Stack>
      </div>
    </>
  );
}
