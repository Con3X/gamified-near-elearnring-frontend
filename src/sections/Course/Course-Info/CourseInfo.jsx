import React, { useRef, useState , useEffect } from "react";
import CourseInfoStyleWrapper from "./CourseInfo.Style";
import uploadIcon from "assets/images/icons/uploadIcon.svg";
import RichBoxQuill from "components/richBoxQuill/RichBoxQuill";
import Button from "components/button";
import CropImage from "components/cropImage/CropImage.jsx";
//import { handleSubmit } from "./index";
import { uploadImage } from "utils/UploadImage";
import { createCourse , updateCourse , getCourseById } from "apiService"; 
import Swal from "sweetalert2";


export default function CourseInfo({courseId}) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    title: "",
    difficulty: "",
    description: "",
    logo: "",
  });

  const handleOnChangeDescription = (value) => {
    setFormInput(() => ({
      ...formInput,
      description: value,
    }));
  };

  const handleCroppedImage = async (img) => {
    setImage(img);
    const url = await uploadImage(img);
    setFormInput(() => ({
      ...formInput,
      logo: url,
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  /**
   * This is to send data to the back end in case of creating a new course.
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const create = await createCourse(formInput);
      if (create.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The course has been created successfully.!",
        });
      }
    } catch (error) {
      console.error("Error in creating course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error create the course.",
      });
    }
  };

  /**
   * This works when modifying course data and sending data to the back end.
   */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const update = await updateCourse(formInput , courseId);
      if (update.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The course has been updated successfully.!",
        });
      }
    } catch (error) {
      console.error("Error in update course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error update the course.",
      });
    }
  };

  /**
   * This works when you click on the Edit Course button to retrieve the course data and include this data in the fields.
   */

  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId !== undefined) {
        try {
          const response = await getCourseById(courseId); 
          const courseData = response.data;
          setFormInput({
            name: courseData.name,
            title: courseData.title,
            difficulty: courseData.difficulty,
            description: courseData.description,
            logo: courseData.logo,
          });
          setImage(courseData.logo); 
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      }
    };

    fetchCourse();
  }, [courseId]);

  return (
    <>
      <CropImage
        onCropComplete={handleCroppedImage}
        fileInputRef={fileInputRef}
      />
      <CourseInfoStyleWrapper>
        <div className="container">
          <div className="row">
            <form>
              <div className="course-info">
                <div className="left-content">
                  <div>
                    <h6>Course Name</h6>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your first name"
                      value={formInput.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h6>Course Title</h6>
                    <input
                      type="text"
                      name="title"
                      placeholder="Ex: Learn about near protocol and ......."
                      value={formInput.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Start Radio Option */}
                  <div>
                    <h6>Course Difficulty</h6>
                    <div className="courseDifficulty">
                      <div className="flex-grow-1">
                        <div>
                          <input
                            type="radio"
                            name="difficulty"
                            value="Beginner"
                            checked={formInput.difficulty === "Beginner"}
                            onChange={handleInputChange}
                          />
                          <label>1. newbie (Beginner)</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="difficulty"
                            value="Normal"
                            checked={formInput.difficulty === "Normal"}
                            onChange={handleInputChange}
                          />
                          <label>2. Learner (Normal)</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="difficulty"
                            value="Advanced"
                            checked={formInput.difficulty === "Advanced"}
                            onChange={handleInputChange}
                          />
                          <label>3. Pro (Advanced)</label>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div>
                          <input
                            type="radio"
                            name="difficulty"
                            value="Legend"
                            checked={formInput.difficulty === "Legend"}
                            onChange={handleInputChange}
                          />
                          <label>4. Legend</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="difficulty"
                            value="Master"
                            checked={formInput.difficulty === "Master"}
                            onChange={handleInputChange}
                          />
                          <label>5. Master</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="difficulty"
                            value="Haker"
                            checked={formInput.difficulty === "Haker"}
                            onChange={handleInputChange}
                          />
                          <label>6. Haker</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Radio Option */}
                  <div>
                    <h6>Course Logo</h6>
                    <div className="course-logo">
                      <label>Upload From Your Disc</label>
                      <img
                        src={image !== null ? image : uploadIcon}
                        alt=""
                        width={image !== null ? 80 : 100}
                        onClick={handleButtonClick}
                        style={{
                          padding: image !== null ? "10px 0px" : "0px",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="right-content">
                  <div>
                    <h6>Course Discription</h6>
                    <div className="discriptionQuill">
                      <RichBoxQuill
                        placeholder="Enter discription talking about this course"
                        value={formInput.description}
                        onChange={(val) => handleOnChangeDescription(val)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 btu">
                <Button
                  variant="mint"
                  lg
                  onClick={courseId === undefined ? handleSubmit : handleUpdate}
                >
                  Send Course To Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CourseInfoStyleWrapper>
    </>
  );
}
