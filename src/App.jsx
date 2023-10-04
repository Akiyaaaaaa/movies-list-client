import { useState, useEffect } from "react";
import api from "./api/axiosConfig";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import "./App.css";
import Trailer from "./components/trailer/Trailer";
import Review from "./components/review/Review";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/movies");
      console.log(response.data);
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/movies/${movieId}`);
      const singleMovie = response.data;

      setMovie(singleMovie);
      console.log(singleMovie);

      setReviews(singleMovie.reviews || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies} />}></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
            <Route
              path="/Review/:movieId"
              element={
                <Review
                  getMovieData={getMovieData}
                  movie={movie}
                  reviews={reviews}
                  setReview={setReviews}
                />
              }
            ></Route>
            <Route path="/auth/login" element={<Login />}></Route>
            <Route path="/auth/signup" element={<Signup />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
