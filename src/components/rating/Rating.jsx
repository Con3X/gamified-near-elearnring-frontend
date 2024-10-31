import React, { useEffect, useState } from "react";
import Button from "components/button";
import "./Rating.css";
import { addRating, getOldRatingForUser } from "lib/nearContract";
import Swal from "sweetalert2";

const Rating = ({ courseId, closed }) => {
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");

  const handleClick = (rate) => {
    setRating(rate);
  };

  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const result = await getOldRatingForUser(courseId.toString());
        setRating(result.rate);
        setMessage(result.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvgRating();
  }, []);

  const handleRating = () => {
    const submitRating = async () => {
      try {
        const result = await addRating(rating, courseId.toString(), message);
        if (Array.isArray(result) && result.length > 0) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Thank you for rating the course. Your feedback has been saved.",
          });
          closed(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    submitRating();
  };

  return (
    <div className="content">
      <div className="startsContainer">
        {[...Array(5)].map((item, index) => {
          return (
            <div
              className="star"
              key={index}
              style={{
                color: index < rating ? "gold" : "white",
              }}
              onClick={() => handleClick(index + 1)}
            >
              ★
            </div>
          );
        })}
      </div>
      <div className="message">
        <h4 className="mb-3">Message</h4>

        <input
          type="text"
          id="message"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="btn-rating">
        <Button variant="white" sm onClick={() => closed(false)}>
          Cancel
        </Button>
        <Button variant="mint" sm onClick={() => handleRating()}>
          Ok
        </Button>
      </div>
    </div>
  );
};

export default Rating;
