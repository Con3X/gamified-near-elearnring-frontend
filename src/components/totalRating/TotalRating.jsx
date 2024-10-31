import React, { useEffect, useState } from "react";
import customer from "assets/images/icons/customer.png";
import { getAllRatingForCourse } from "lib/nearContract";

export default function TotalRating({ courseId }) {
  const [averageRating, setAverageRating] = useState(0);
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const id = courseId && courseId.toString();
        const resault = await getAllRatingForCourse(id);
        setRatings(resault);

        if (resault.length > 0) {
          const totalRate = resault.reduce((acc, item) => acc + item.rate, 0);
          const avgRate = totalRate / resault.length;
          setAverageRating(avgRate);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvgRating();
  }, [courseId]);

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= averageRating ? "gold" : "gray" }}>
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div>
      <span className="stars-rating">{renderStars()}</span>{" "}
      <span className="count-rating">
        {" "}
        <img src={customer} width="25" alt="course logo" />
        {ratings && ratings.length > 0 ? ratings.length : 0}
      </span>
    </div>
  );
}
