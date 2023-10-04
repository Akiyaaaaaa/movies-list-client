import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

import "./Hero.css";

const Hero = ({ movies }) => {
  const navigate = useNavigate();
  function reviews(movieId) {
    navigate(`/Review/${movieId}`);
  }
  return (
    <>
      <div className="movie-carousel-container">
        <Carousel>
          {movies?.map((movie) => {
            return (
              <Paper key={movie.imdbId}>
                <div className="movie-card-container">
                  <div
                    className="movie-card"
                    style={{ "--img": `url(${movie.backdrops[0]})` }}
                  >
                    <div className="movie-detail">
                      <div className="movie-poster">
                        <img src={movie.poster} alt="" />
                      </div>
                      <div className="movie-info">
                        <div className="movie-info-header">
                          <div className="movie-title">
                            <h4>{movie.title}</h4>
                          </div>
                          <div className="movie-buttons-container">
                            <Link
                              to={`/Trailer/${movie.trailerLink.substring(
                                movie.trailerLink.length - 11
                              )}`}
                            >
                              <div className="play-button-icon-container">
                                <FontAwesomeIcon
                                  className="play-button-icon"
                                  icon={faCirclePlay}
                                  title="Watch trailer"
                                />
                              </div>
                            </Link>
                            <div className="movie-review-button-container">
                              <Button
                                className="review-button"
                                onClick={() => reviews(movie.imdbId)}
                              >
                                Reviews
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="movie-info-body">
                          <div className="movie-reldate-gen">
                            <p>Release date : {movie.releaseDate}</p>
                            <div className="movie-genres"></div>
                            {movie.genres.map((val, key) => (
                              <p key={key} className="genre-item">
                                {val}
                              </p>
                            ))}
                          </div>
                          <div className="movie-plots">{movie.plots}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
