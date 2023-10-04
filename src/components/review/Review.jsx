import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "./ReviewForm";

const Review = ({ getMovieData, movie, reviews, setReview }) => {
  const revText = useRef();
  const params = useParams();
  const movieId = params.movieId; //imdbId
  useEffect(() => {
    getMovieData(movieId);
  }, []);
  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;
    try {
      const response = await api.post("/api/v1/reviews", {
        reviewContent: rev.value,
        imdbId: movieId,
      });
      const update = [...reviews, { body: rev.value }];
      rev.value = "";
      setReview(update);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>Reviews</h3>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <img src={movie?.poster} alt="" />
          </Col>
          <Col>
            {
              <>
                <Row>
                  <Col>
                    <ReviewForm
                      handleSubmit={addReview}
                      revText={revText}
                      labelText="Write a Review?"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            }
            {Array.isArray(reviews) &&
              reviews?.map((val) => {
                const createdDate = new Date(val.created);
                const updatedDate = new Date(val.updated);

                const createdDateTimeString = createdDate.toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                );

                const updatedDateTimeString = updatedDate.toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                );

                return (
                  <>
                    <Row>
                      <Col>
                        <div>
                          {val.isUpdated ? (
                            <p>{createdDateTimeString}</p> //this is date and time fromat
                          ) : (
                            <p>{updatedDateTimeString}</p> //this is date and time fromat
                          )}
                          <p>{val.body}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <hr />
                      </Col>
                    </Row>
                  </>
                );
              })}
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Review;
