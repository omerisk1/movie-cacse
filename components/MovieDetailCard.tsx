import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export default function MovieDetailCard({ data }: { data: any }) {
  const router = useRouter();
  return (
    <Container className="card-detail-container">
      {/* <div className="loading-circle">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div> */}
      {data === null || data === undefined ? (
        <div className="loading-circle">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <>
          <Row className="detail-area">
            <Col lg={4} sm={12} className="detail-img">
              <img
                src={data?.Poster}
                alt="movie-detail-image"
                className="detail-image"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://media.istockphoto.com/id/1179735330/vector/coming-soon-handwrite-title-on-closed-red-silky-luxury-theater-curtain-background-with.jpg?s=612x612&w=0&k=20&c=CRDaP4DkjZfI-oyAF-iNCjZm7Ny0twpmhojvR6Iybak=";
                }}
              />
            </Col>
            <Col lg={8} sm={12} className="detail-info">
              <p className="detail-title">{data?.Title}</p>
              <p className="detail-runtime">{data?.Runtime}</p>
              <p className="detail-type">{data?.Type}</p>
              <p className="detail-actors">{data?.Actors}</p>
              <p className="detail-rating">{data?.imdbRating}</p>
              <p className="detail-plot">{data?.Plot}</p>
              <p className="detail-relased">{data?.Released}</p>
              <p className="detail-country">{data?.Country}</p>
            </Col>
          </Row>
          <Row className="home-btn-row">
            <button onClick={() => router.push("/")} className="home-btn">
              Anasayfa
            </button>
          </Row>
        </>
      )}
    </Container>
  );
}
