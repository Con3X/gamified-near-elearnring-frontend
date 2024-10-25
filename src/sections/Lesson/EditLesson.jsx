import React, { useState, useEffect } from "react";
import EditLessonStyleWrapper from "./EditLesson.Style";
import Button from "components/button";
import ListManager from "components/listManager/ListManager";
import {
  handleInputChange,
  handelQAList,
  handleOnChangeDescription,
} from "./index";
import RichBoxQuill from "components/richBoxQuill/RichBoxQuill";
import { createLesson, updateLesson, getLessonById } from "apiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EditLesson({ courseId, lessonId }) {
  const [showQA, setShowQA] = useState(false);
  const [lessonid, setLessonId] = useState(null);
  /**
   * if edite lesson QA shaow or hide
   */
  useEffect(() => {
    if (lessonId) {
      setShowQA(true);
    }
  }, [lessonId]);

  /**
   * form input
   */
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    pre_note: "",
    next_note: "",
    order: 0,
    qaList: [],
  });

  /**
   * send data lesson to backend and create
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Extract qList from data to be sent
    const { qaList, ...lessonData } = formInput;
    lessonData.order = Number(lessonData.order);
    try {
      const create = await createLesson(lessonData, courseId);
      if (create && create.data && create.data.id) {
        setLessonId(create.data.id);
        setShowQA(true);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The lesson has been created successfully! <br> You can add questions to the lesson from the side section.",
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth", 
        });
      }
    } catch (error) {
      console.error("Error in creating Lesson:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error update the lesson.",
      });
    }
  };

  /**
   * redirect after add QA into store QA interface
   */
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "Multiple-choice questions" && lessonid) {
      navigate(`/add-qa/${courseId}/${lessonid}`);
    }
    if (selectedOption === "Multiple-choice questions" && lessonId) {
      navigate(`/add-qa/${courseId}/${lessonId}`);
    }
  };

  /**
   * update date lesson
   */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { qaList, ...lessonData } = formInput;
    lessonData.order = Number(lessonData.order);
    try {
      const update = await updateLesson(lessonData, courseId, lessonId);
      if (update && update.data && update.data.id) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The lesson has been updated successfully!",
        });
      }
    } catch (error) {
      console.error("Error in update Lesson:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error update the lesson.",
      });
    }
  };

  /**
   * This works when you click on the Edit Course button to retrieve the course data and include this data in the fields.
   */

  useEffect(() => {
    const fetchCourse = async () => {
      if (lessonId !== undefined) {
        try {
          const response = await getLessonById(courseId, lessonId);
          const lessonData = response.data;
          setFormInput({
            title: lessonData.title,
            description: lessonData.description,
            pre_note: lessonData.pre_note,
            next_note: lessonData.next_note,
            order: lessonData.order,
            qaList: lessonData.question,
          });
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      }
    };

    fetchCourse();
  }, [courseId]);

  return (
    <>
      <EditLessonStyleWrapper>
        <div className="container">
          <div className="row">
            <form>
              <div className="edit-lesson">
                <div className="left-content">
                  <h4 className="mb-3">Main Info</h4>
                  <div>
                    <h6>Lesson Name</h6>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter your lesson name"
                      value={formInput.title}
                      onChange={(e) => handleInputChange(e, setFormInput)}
                    />
                  </div>

                  {/*
                  <div>
                    <h6>Small Title</h6>
                    <input
                      type="text"
                      name="smallTitle"
                      placeholder="Enter your small title"
                      value={formInput.smallTitle}
                      onChange={(e) => handleInputChange(e, setFormInput)}
                    />
                  </div>
                  */}

                  <div>
                    <h6>Discription</h6>
                    <div className="discriptionQuill">
                      <RichBoxQuill
                        placeholder="Enter discription talking about this lesson"
                        value={formInput.description}
                        onChange={(val) =>
                          handleOnChangeDescription(val, setFormInput)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <h6>Pre Lesson Note</h6>
                    <input
                      type="text"
                      name="pre_note"
                      placeholder="Enter pre note"
                      value={formInput.pre_note}
                      onChange={(e) => handleInputChange(e, setFormInput)}
                    />
                  </div>

                  <div>
                    <h6>After Lesson Note</h6>
                    <input
                      type="text"
                      name="next_note"
                      placeholder="Enter next note"
                      value={formInput.next_note}
                      onChange={(e) => handleInputChange(e, setFormInput)}
                    />
                  </div>

                  <div>
                    <h6>Lesson arrangement</h6>
                    <input
                      type="number"
                      name="order"
                      placeholder="Lesson arrangement"
                      value={formInput.order}
                      onChange={(e) => handleInputChange(e, setFormInput)}
                    />
                  </div>

                  <div className="mt-3 btu">
                    <Button
                      variant="mint"
                      lg
                      onClick={
                        lessonId === undefined ? handleSubmit : handleUpdate
                      }
                    >
                      Save And Publish
                    </Button>
                  </div>
                </div>

                {showQA && (
                  <div className="right-content">
                    <h4 className="mb-3">Add Q/A</h4>
                    <div className="dropdown-container">
                      <select
                        id="qa-type"
                        name="qa-type"
                        value="Shoce Q/A Type"
                        onChange={handleSelectChange}
                      >
                        <option value="Shoce Q/A Type" disabled>
                          Shoce Q/A Type
                        </option>
                        <option value="Multiple-choice questions">
                          + Multiple-choice questions
                        </option>
                      </select>
                    </div>
                    <div>
                      <ListManager
                        initialData={formInput.qaList}
                        mainField={"description"}
                        onChange={(data) => handelQAList(data, setFormInput)}
                        href={`/edit-qa/${courseId}/${lessonId}`}
                        idField={"id"}
                        arrangeFild={"sequence"}
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </EditLessonStyleWrapper>
    </>
  );
}
