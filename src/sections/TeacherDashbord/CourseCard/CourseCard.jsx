import CardHover from "components/cardHover";
import CourseCardStyleWrapper from "./CourseCard.style";
import Button from "components/button";
import photoDefault from "assets/images/photoDefault.webp";
import { useEffect, useState } from "react";
import { getUserProfile , updateCourseStatus } from "apiService";
import Swal from "sweetalert2";


const CourseCard = ({ id, logo, name, title, difficulty, publish_status }) => {
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectDescription, setRejectDescription] = useState("");
  const [isAdmin , setIsAdmin] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await getUserProfile();
        if (user.data && user.data.isAdmin) {
          setIsAdmin(true);
        }
        
      }catch(error){
        console.error("Error fetching courses", error);
      }
      
    }
    fetch();
  },[]);


  const handleReject = () => {
    setShowRejectInput(true);
  };

  const handleApprove =async (e) => {
    e.preventDefault();
    const data = {
      publish_status:"APPROVED"
    };
    try {
      const updateStatus = await updateCourseStatus(data , id);
      if (updateStatus.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The course is successfully approve.!",
        });
      }
      
    } catch (error) {
      console.error("Error in creating course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Try again or contact with support.",
      });
    }
  };

  const handleSubmitReject = async (e) => {
    e.preventDefault();
    const data = {
      publish_status:"REJECTED",
      publish_status_reson: rejectDescription
    };
    try {
      const updateStatus = await updateCourseStatus(data , id);
      if (updateStatus.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The course is successfully reject.!",
        });
      }
      
    } catch (error) {
      console.error("Error in creating course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Try again or contact with support.",
      });
    }
  };



  return (
    <CourseCardStyleWrapper className="teacher_item_wrapper">
      <div className="course-info d-flex">
        <Link to={`/show-lesson/${id}`}>
          <img
            src={logo || photoDefault}
            width="100%"
            alt="course logo"
            onError={(e) => {
              if (e.target.src !== photoDefault) {
                e.target.src = photoDefault;
              }
            }}
          />
        </Link>
        <div className="course-auother">
          <h4 className="mb-10">
            <a href={`/show-lesson/${id}`}>{title}</a>
          </h4>
          <div>{name}</div>
        </div>
      </div>

      <div className="course-content">
        <div className="course-header d-flex justify-content-between align-items-center">
          <div className="heading-title">
            <h4>{difficulty}</h4>
          </div>
        </div>
      </div>
      <div className="publish-status">
      {isAdmin ? (
        <>
        { publish_status.toUpperCase() !== "REJECTED" ? (
          <Button
            variant="danger"
            sm
            onClick={handleReject}
            style={{ marginRight: '10px' }}
          >
            Reject
          </Button>
        ):(
          <p></p>
      )}

        { publish_status.toUpperCase() !== "APPROVED" ? (
          <Button variant="success" sm onClick={handleApprove}>
            Approve
          </Button>
         ):(
          <p></p>
        )}


          {showRejectInput && (
            <div>
              <input
                type="text"
                placeholder="Enter rejection reason"
                value={rejectDescription}
                onChange={(e) => setRejectDescription(e.target.value)}
              />
              <Button variant="warning" sm onClick={handleSubmitReject}>
                Submit
              </Button>
            </div>
          )}
        </>
      ) : (
        publish_status.toUpperCase() !== "REJECTED" ? (
          <Button variant="mint" sm href={`/course-info/${id}`}>
            Edit
          </Button>
        ) : (
          <h4>{publish_status}</h4>
        )
      )}
    </div>
  


      <CardHover />
    </CourseCardStyleWrapper>
  );
};

export default CourseCard;
