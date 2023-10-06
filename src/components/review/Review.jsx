import { Fragment, useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReviewForm from "./ReviewForm";
import authHeader from "../../service/authHeader";

const Review = ({ getMovieData, movie, reviews, setReview }) => {
  const revText = useRef();
  const params = useParams();
  const movieId = params.movieId; //imdbId
  const user = JSON.parse(localStorage.getItem("user"));
  let userId = "";
  if (user === null) {
    userId = "0";
  } else {
    userId = user.body.id;
  }
  useEffect(() => {
    getMovieData(movieId);
  }, []);
  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;
    try {
      const response = await api.post(
        "/reviews",
        {
          reviewContent: rev.value,
          imdbId: movieId,
          userId: userId,
        },
        { headers: authHeader() }
      );
      const updatedReviewsResponse = await api.get("/reviews");
      setReview(updatedReviewsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const editOrDelete = (reviewUserId) => {
    return userId === reviewUserId;
  };

  const editReview = async (reviewId) => {
    const reviewToEdit = reviews.find((review) => review.id === reviewId);

    if (!reviewToEdit) {
      console.error("Review not found.");
      return;
    }

    const editedContent = prompt("Edit your review:", reviewToEdit.body);

    if (editedContent !== null) {
      try {
        const response = await api.put(
          `/reviews/${reviewId}`,
          {
            reviewContent: editedContent,
          },
          { headers: authHeader() }
        );

        const updatedReviews = reviews.map((review) => {
          if (review.id === reviewId) {
            return {
              ...review,
              body: editedContent,
            };
          }
          return review;
        });

        setReview(updatedReviews);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteReview = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (confirmDelete) {
      try {
        await api.delete(`/reviews/${reviewId}`, {
          headers: authHeader(),
        });

        const updatedReviews = reviews.filter(
          (review) => review.id !== reviewId
        );
        setReview(updatedReviews);
      } catch (error) {
        console.error(error);
      }
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
            <img
              src={movie?.poster}
              alt={movie?.title}
              style={{ width: "-webkit-fill-available" }}
            />
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
                  <Fragment key={val.id}>
                    <Row>
                      <Col>
                        <div>
                          {val.isUpdated ? (
                            <p>{createdDateTimeString}</p>
                          ) : (
                            <p>{updatedDateTimeString}</p>
                          )}
                          <p>{val.body}</p>
                          {editOrDelete(val.user.id) && (
                            <div>
                              <span
                                className="icon-button"
                                onClick={() => editReview(val.id)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </span>
                              <span
                                className="icon-button"
                                onClick={() => deleteReview(val.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </span>
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <hr />
                      </Col>
                    </Row>
                  </Fragment>
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
