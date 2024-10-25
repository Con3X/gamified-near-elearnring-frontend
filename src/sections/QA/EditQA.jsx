import React, { useState, useEffect } from "react";
import EdirQAStyleWrapper from "./EditQA.Style";
import Button from "components/button";
import { handleSubmit, handleOnChangeDescription } from "./index";
import RichBoxQuill from "components/richBoxQuill/RichBoxQuill";
import Answares from "./Answares/Answares";
import { updateQA, createQA, findQA } from "apiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EditQA({ courseId, lessonId, qaId }) {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    description: "",
    options: [],
    //sequence:0
  });

  /**
   * send data to backend
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    //extract id answare from array options (answare)
    const optionsWithoutId = formInput.options.map(({ id, ...rest }) => rest);

    //Prepare the sent data without index 0,1,2....etc from array options (answare)
    const updatedFormInput = {
      description: formInput.description,
      //sequence:Number(formInput.sequence),
      options: optionsWithoutId,
    };

    try {
      const creat = await createQA(updatedFormInput, courseId, lessonId);
      if (creat) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "QA Created successfully!",
        });
        navigate(`/edit-lesson/${courseId}/${lessonId}`);
      }
    } catch (error) {
      console.error("Error Created QA:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error created QA.",
      });
    }
  };

  /**
   * update QA data and send backend
   */
  const handleUpdate = async (e) => {
    e.preventDefault();
    //extract question_id from array options (answare)
    const optionsWithoutId = formInput.options.map(
      ({ question_id, ...rest }) => rest
    );

    //Prepare the sent data without index 0,1,2....etc from array options (answare)
    const updatedFormInput = {
      description: formInput.description,
      //sequence:Number(formInput.sequence),
      options: optionsWithoutId,
    };
    try {
      const update = await updateQA(updatedFormInput, courseId, lessonId, qaId);
      if (update) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "QA Updated successfully!",
        });
      }
    } catch (error) {
      console.error("Error updating QA:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error update QA.",
      });
    }
  };

  /**
   * This works when you click on the Edit Course button to retrieve the course data and include this data in the fields.
   */

  useEffect(() => {
    const fetchQA = async () => {
      if (lessonId !== undefined) {
        try {
          const response = await findQA(courseId, lessonId, qaId);
          const qaData = response.data;
          setFormInput({
            description: qaData.description,
            options: qaData.answer,
          });
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      }
    };

    fetchQA();
  }, [courseId]);

  return (
    <>
      <EdirQAStyleWrapper>
        <div className="container">
          <div className="row">
            <form>
              <div className="edit-lesson">
                <div className="left-content">
                  <div>
                    <h4>Question</h4>
                    <div className="discriptionQuill">
                      <RichBoxQuill
                        placeholder="Enter discription talking about this course"
                        value={formInput.description}
                        onChange={(val) =>
                          handleOnChangeDescription(val, setFormInput)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="right-content">
                  <div>
                    <h4>The Answare</h4>
                    <Answares
                      data={formInput.options}
                      setFormInput={setFormInput}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-3 btu">
            <Button
              variant="mint"
              lg
              onClick={qaId === undefined ? handleSubmit : handleUpdate}
            >
              Save
            </Button>
          </div>
        </div>
      </EdirQAStyleWrapper>
    </>
  );
}
