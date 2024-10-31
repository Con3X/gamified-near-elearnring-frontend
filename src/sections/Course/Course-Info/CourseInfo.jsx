import React, { useRef, useState, useEffect } from "react";
import CourseInfoStyleWrapper from "./CourseInfo.Style";
import uploadIcon from "assets/images/icons/uploadIcon.svg";
import RichBoxQuill from "components/richBoxQuill/RichBoxQuill";
import Button from "components/button";
import CropImage from "components/cropImage/CropImage.jsx";
import { courseDifficultyList } from "./index";
import { uploadImage } from "utils/UploadImage";
import { createCourse, updateCourse, getCourseById } from "apiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CourseInfo({ courseId }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    title: "",
    tag: "",
    difficulty: "Beginner",
    description: "",
    logo: "",
  });

  const handleCroppedImage = async (img) => {
    setImage(img);
    const url = await uploadImage(img);
    setFormInput((prevInput) => ({
      ...prevInput,
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

    if (!formInput.tag.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Field",
        text: "The Tags field is required. Please enter all related tags.",
      });
      return;
    }

    try {
      const create = await createCourse(formInput);
      if (create.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The course has been created successfully! You can now proceed to add lessons",
        });
        navigate(`/show-lesson/${create.data.id}`);
      }

    
    } catch (error) {
      console.error("Error in creating course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        html: `There was an error create the course: <br /> <b> ${error.cause.message} </b>`,
      });
    }
  };


  /**
   * This works when modifying course data and sending data to the back end.
   */
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formInput.tag.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Field",
        text: "The Tags field is required. Please enter all related tags.",
      });
      return;
    }

    try {
      const update = await updateCourse(formInput, courseId);
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
            tag: courseData.tag,
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
                      placeholder="Enter the course name"
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
                  <div>
                    <h6>Course Tags</h6>
                    <input
                      type="text"
                      name="tag"
                      placeholder="Tags of the course like: JavaScript, Smart-Contract, AI ..."
                      value={formInput.tag}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Start Radio Option */}
                  <div>
                    <h6>Course Difficulty</h6>
                    <div className="courseDifficulty d-flex">
                      <div className="flex-grow-1">
                        {courseDifficultyList
                          .slice(0, Math.ceil(courseDifficultyList.length / 2))
                          .map((difficulty, index) => (
                            <div key={index}>
                              <input
                                type="radio"
                                name="difficulty"
                                value={difficulty.value}
                                checked={
                                  formInput.difficulty === difficulty.value
                                }
                                onChange={handleInputChange}
                              />
                              <label>{difficulty.label}</label>
                            </div>
                          ))}
                      </div>
                      <div className="flex-grow-1">
                        {courseDifficultyList
                          .slice(Math.ceil(courseDifficultyList.length / 2))
                          .map((difficulty, index) => (
                            <div key={index}>
                              <input
                                type="radio"
                                name="difficulty"
                                value={difficulty.value}
                                checked={
                                  formInput.difficulty === difficulty.value
                                }
                                onChange={handleInputChange}
                              />
                              <label>{difficulty.label}</label>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* End Radio Option */}
                  <div>
                    <h6>Course Logo</h6>
                    <div className="course-logo">
                      <label>Upload from your Device</label>
                      <img
                        src={image ? image : uploadIcon}
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
                    <h6>Course Description</h6>
                    <div className="discriptionQuill">
                      <RichBoxQuill
                        placeholder="Enter description talking about this course"
                        value={formInput.description}
                        onChange={(val) => handleInputChange({target: {name: 'description', value: val}})}
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
                  {courseId === undefined ? 'Add and Edit Lessons' : 'Update'}
                </Button>
                </div>
                <div className="mt-3 btu">
                {!!courseId && 
                  <Button
                    variant="mint"
                    lg
                    onClick={() => navigate(`/show-lesson/${courseId}`)}
                  > 
                    Edit Lessons
                  </Button>
                }
              </div>
            </form>
          </div>
        </div>
      </CourseInfoStyleWrapper>
    </>
  );
}
